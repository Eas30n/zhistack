package com.eas30n.zhistack.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Ticket;
import com.eas30n.zhistack.mapper.TicketMapper;
import com.eas30n.zhistack.entity.SeckillTicket;
import com.eas30n.zhistack.service.ISeckillTicketService;
import com.eas30n.zhistack.service.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

import static com.eas30n.zhistack.utils.RedisConstants.SECKILL_STOCK_KEY;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Service
public class TicketServiceImpl extends ServiceImpl<TicketMapper, Ticket> implements ITicketService {

    @Resource
    private ISeckillTicketService seckillTicketService;

    @Resource
    private RedisTemplate redisTemplate;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result queryTicketOfActivity(Long activityId) {
        // 查询门票信息
        List<Ticket> tickets = getBaseMapper().queryTicketOfActivity(activityId);
        // 返回结果
        return Result.ok(tickets);
    }

    @Override
    @Transactional
    public void addSeckillTicket(Ticket ticket) {
        // 保存门票
        save(ticket);
        // 保存秒杀信息
        SeckillTicket seckillTicket = new SeckillTicket();
        seckillTicket.setTicketId(ticket.getId());
        seckillTicket.setStock(ticket.getStock());
        seckillTicket.setBeginTime(ticket.getBeginTime());
        seckillTicket.setEndTime(ticket.getEndTime());
        seckillTicketService.save(seckillTicket);
        //保存秒杀库存到Redis
        stringRedisTemplate.opsForValue().set(SECKILL_STOCK_KEY + ticket.getId(), ticket.getStock().toString());
    }
}
