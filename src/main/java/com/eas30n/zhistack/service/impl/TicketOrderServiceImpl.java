package com.eas30n.zhistack.service.impl;

import com.eas30n.zhistack.config.RedissonConfig;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.SeckillTicket;
import com.eas30n.zhistack.entity.TicketOrder;
import com.eas30n.zhistack.mapper.TicketOrderMapper;
import com.eas30n.zhistack.service.ISeckillTicketService;
import com.eas30n.zhistack.service.ITicketOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.utils.RedisIdWorker;
import com.eas30n.zhistack.utils.SimpleRedisLock;
import com.eas30n.zhistack.utils.UserHolder;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.connection.stream.StreamReadOptions;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.eas30n.zhistack.utils.RedisConstants.SECKILL_ORDER_STREAM_KEY;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author chan
 * @since 2025-5-2
 */
@Service
@Slf4j
public class TicketOrderServiceImpl extends ServiceImpl<TicketOrderMapper, TicketOrder> implements ITicketOrderService {

    @Resource
    private ISeckillTicketService seckillTicketService;

    @Resource
    private RedisIdWorker redisIdWorker;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private RedissonClient redissonClient;

    /**
     * 自注入：注入自身的代理对象，供 Redis Stream 消费者线程调用带 @Transactional 的方法。
     * 消费者线程不是从 Spring 代理入口进来的，直接 this.createTicketOrder() 事务不生效，
     * 必须通过这个被代理过的 self 调用，@Transactional 才会被拦截。
     */
    @Resource
    private ITicketOrderService self;

    // Redis Stream 消费者组与消费者名称
    private static final String STREAM_GROUP = "g1";
    private static final String STREAM_CONSUMER = "c1";

    private static final DefaultRedisScript<Long> SECKILL_SCRIPT;

    static {
        SECKILL_SCRIPT = new DefaultRedisScript<>();
        SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua")); // 指定脚本位置
        SECKILL_SCRIPT.setResultType(Long.class);    // 返回结果类型
    }

    private BlockingQueue<TicketOrder> orderTasks = new ArrayBlockingQueue<>( 1024 * 1024);
    private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();  // 线程池

    /**
     * Spring 容器初始化该 Bean 后自动执行：启动一个后台线程专门消费 Redis Stream 中的秒杀订单。
     * 用单线程消费，天然串行，配合分布式锁 + DB 唯一校验双重保证一人一单。
     */
    @PostConstruct
    public void initStreamConsumer() {
        SECKILL_ORDER_EXECUTOR.submit(new SeckillOrderConsumer());
    }

    /**
     * 创建（或补齐）消费者组。mkStream=true 表示 stream 不存在时自动创建。
     * 组已存在会抛 BUSYGROUP，忽略即可（幂等）。启动初始化与运行期 NOGROUP 自愈共用。
     */
    private void ensureStreamGroup() {
        try {
            stringRedisTemplate.execute((RedisConnection connection) ->
                    connection.xGroupCreate(
                            SECKILL_ORDER_STREAM_KEY.getBytes(StandardCharsets.UTF_8),
                            STREAM_GROUP,
                            ReadOffset.latest(),   // 只消费组创建之后的新消息
                            true));                // MKSTREAM
        } catch (Exception e) {
            log.info("消费者组 [{}] 已存在或创建跳过：{}", STREAM_GROUP, e.getMessage());
        }
    }

    /**
     * Redis Stream 消费者：从 stream.orders 读取 Lua 阶段投递的订单消息，异步落库削峰填谷。
     */
    private class SeckillOrderConsumer implements Runnable {
        @Override
        public void run() {
            // 1.创建消费者组
            ensureStreamGroup();

            // 2.循环拉取消息（阻塞式读取，无消息时最多阻塞 2s 后返回 null，再进入下一轮）
            while (true) {
                try {
                    List<MapRecord<String, Object, Object>> records = stringRedisTemplate.opsForStream().read(
                            Consumer.from(STREAM_GROUP, STREAM_CONSUMER),
                            StreamReadOptions.empty().count(10).block(Duration.ofSeconds(2)),
                            StreamOffset.create(SECKILL_ORDER_STREAM_KEY, ReadOffset.lastConsumed())
                    );

                    // 3.本轮无消息，继续下一轮
                    if (records == null || records.isEmpty()) {
                        continue;
                    }

                    // 4.逐条处理订单
                    for (MapRecord<String, Object, Object> record : records) {
                        handleStreamRecord(record);
                    }
                } catch (Exception e) {
                    // NOGROUP：消费者组被清空/丢失（如 flushdb、运维误删），重建后继续，避免异常风暴
                    if (e.getMessage() != null && e.getMessage().contains("NOGROUP")) {
                        log.warn("检测到消费者组丢失，正在自愈重建...");
                        ensureStreamGroup();
                        continue;
                    }
                    // 其他读取异常（如网络抖动）不 ack，消息仍留在 pending 列表，稍后重试；sleep 防止异常风暴
                    log.error("读取秒杀订单消息异常", e);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException ignored) {
                        Thread.currentThread().interrupt();
                        return;
                    }
                }
            }
        }

        /**
         * 处理单条订单消息：解析 -> 加锁落库 -> ack。
         * 只有成功落库或明确业务拒绝才 ack；意外异常不 ack，交由 Redis pending 重投。
         */
        private void handleStreamRecord(MapRecord<String, Object, Object> record) {
            Map<Object, Object> body = record.getValue();
            Long userId = Long.valueOf(body.get("userId").toString());
            Long ticketId = Long.valueOf(body.get("ticketId").toString());
            Long orderId = Long.valueOf(body.get("id").toString());

            // 按 userId 加分布式锁，保证并发消费下"一人一单"（消费者线程内无法用 UserHolder）
            RLock lock = redissonClient.getLock("lock:order:" + userId);
            boolean isLock = lock.tryLock();
            if (!isLock) {
                // 未获取到锁：暂不 ack，等待下一轮或 pending 重投
                log.warn("用户 {} 下单加锁失败，稍后重试", userId);
                return;
            }
            try {
                // 通过 self 代理调用，使 @Transactional 生效
                self.createTicketOrder(userId, ticketId, orderId);
                // 处理成功或业务性拒绝（重复下单/库存不足）都 ack，避免无效消息无限重投
                stringRedisTemplate.opsForStream().acknowledge(
                        SECKILL_ORDER_STREAM_KEY, STREAM_GROUP, record.getId());
            } catch (org.springframework.dao.DuplicateKeyException dup) {
                // DB 唯一索引 uk_user_ticket 兜底命中（如 Redis 被清空后重复消息）：属业务性重复，ack 掉避免重投风暴
                log.warn("重复订单被DB唯一索引拦截, userId={}, ticketId={}", userId, ticketId);
                stringRedisTemplate.opsForStream().acknowledge(
                        SECKILL_ORDER_STREAM_KEY, STREAM_GROUP, record.getId());
            } catch (Exception e) {
                // 意外异常（如 DB 故障）：不 ack，消息保留在 pending 以便重试
                log.error("秒杀订单落库失败, orderId={}", orderId, e);
            } finally {
                lock.unlock();
            }
        }
    }

    @Override
    public Result seckillTicket(Long ticketId) {
        //获取用户
        Long userId = UserHolder.getUser().getId();
        long orderId = redisIdWorker.nextId("order");
        // 1.执行lua脚本
        Long result = stringRedisTemplate.execute(
                SECKILL_SCRIPT,
                Collections.emptyList(),
                ticketId.toString(), userId.toString(), String.valueOf(orderId)
        );
        int r = result.intValue();
        // 2.判断结果是否为0
        if (r != 0) {
            // 2.1.不为0 ，代表没有购买资格
            return Result.fail(r == 1 ? "库存不足" : "不能重复下单");
        }
        /*//2.2为0 ，代表购买资格
        TicketOrder ticketOrder = new TicketOrder();
        // 2.3.订单id
        long orderId = redisIdWorker.nextId("order");
        ticketOrder.setId(orderId);
        // 2.4.用户id
        ticketOrder.setUserId(userId);
        // 2.5.代金票id
        ticketOrder.setTicketId(ticketId);
        //2.6.放入阻塞队列
        orderTasks.add(ticketOrder);*/

        // 3.返回订单id
        return Result.ok(orderId);
    }

    /*@Override
    public Result seckillTicket(Long ticketId) {
        //1.查询门票
        SeckillTicket ticket = seckillTicketService.getById(ticketId);

        //2.判断秒杀是否开始
        if(ticket.getBeginTime().isAfter(LocalDateTime.now())){
            return Result.fail("秒杀尚未开始!");
        }

        //3.判断秒杀是否结束
        if(ticket.getEndTime().isBefore(LocalDateTime.now())){
            return Result.fail("秒杀已经结束!");
        }

        //4.判断库存是否充足
        if (ticket.getStock()<1) {
            return Result.fail("库存不足!");
        }

        Long userId = UserHolder.getUser().getId();
        //创建锁对象
        //SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
        //通过Redisson创建锁对象
        RLock lock = redissonClient.getLock("lock:order:" + userId);


        //获取锁
        boolean isLock = lock.tryLock(); // 锁的超时时间  用无参默认失败不等待立即返回

        //判断获取锁成功
        if (!isLock) {
            //获取锁失败,返回错误信息或重试
            return Result.fail("不允许重复下单!");

        }
        try {
            //获取代理对象(避免事务失效)
            ITicketOrderService proxy = (ITicketOrderService) AopContext.currentProxy();
            return proxy.createTicketOrder(ticketId);
        } catch (IllegalStateException e) {
            throw new RuntimeException(e);
        }finally {
            //释放锁
            lock.unlock();
        }

    }*/

    @Override
    @Transactional
    public Result createTicketOrder(Long userId, Long ticketId, Long orderId) {

        // 5.一人一单校验（DB 层兜底，配合消费者内的分布式锁双重保证）
        int count = query().eq("user_id", userId).eq("ticket_id", ticketId).count();
        if (count > 0) {
            // 用户已经购买过了
            return Result.fail("用户已经购买过一次！");
        }

        // 6.扣减数据库库存：stock = stock - 1 where ticket_id = ? and stock > 0（乐观并发，防超卖）
        boolean success = seckillTicketService.update()
                .setSql("stock = stock - 1") // set stock = stock - 1
                .eq("ticket_id", ticketId).gt("stock", 0) // where id = ? and stock > 0
                .update();
        if (!success) {
            // 扣减失败
            return Result.fail("库存不足！");
        }

        // 7.创建订单：直接使用 Lua 阶段生成并随消息投递过来的 orderId，保证与返回给前端的订单号一致
        TicketOrder ticketOrder = new TicketOrder();
        ticketOrder.setId(orderId);
        ticketOrder.setUserId(userId);
        ticketOrder.setTicketId(ticketId);
        save(ticketOrder);

        return Result.ok(orderId);
    }
}