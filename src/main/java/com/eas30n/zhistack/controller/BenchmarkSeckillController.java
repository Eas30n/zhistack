package com.eas30n.zhistack.controller;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.SeckillTicket;
import com.eas30n.zhistack.entity.TicketOrder;
import com.eas30n.zhistack.service.ISeckillTicketService;
import com.eas30n.zhistack.service.ITicketOrderService;
import com.eas30n.zhistack.utils.RedisIdWorker;
import com.eas30n.zhistack.utils.UserHolder;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDateTime;

/**
 * 压测对照组 A：刻意保留的"裸奔版"秒杀，用于演示无防护时的超卖与重复下单。
 * 仅用于 benchmark 对比（见 benchmark/README），生产路径是 Lua + Stream 异步落库版。
 */
@RestController
@RequestMapping("benchmark")
public class BenchmarkSeckillController {

    @Resource
    private ISeckillTicketService seckillTicketService;
    @Resource
    private ITicketOrderService ticketOrderService;
    @Resource
    private RedisIdWorker redisIdWorker;

    @PostMapping("/seckill-no-guard/{id}")
    public Result seckillNoGuard(@PathVariable("id") Long ticketId) {
        Long userId = UserHolder.getUser().getId();
        // 新手写法：查库存 -> 判重复 -> 扣减 -> 下单，每一步之间都有并发窗口
        SeckillTicket ticket = seckillTicketService.getById(ticketId);
        if (ticket == null || ticket.getStock() <= 0) {
            return Result.fail("库存不足");
        }
        long count = ticketOrderService.count(new LambdaQueryWrapper<TicketOrder>()
                .eq(TicketOrder::getUserId, userId)
                .eq(TicketOrder::getTicketId, ticketId));
        if (count > 0) {
            return Result.fail("不能重复下单");
        }
        ticket.setStock(ticket.getStock() - 1);
        seckillTicketService.updateById(ticket);
        TicketOrder order = new TicketOrder();
        order.setId(redisIdWorker.nextId("order"));
        order.setUserId(userId);
        order.setTicketId(ticketId);
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        ticketOrderService.save(order);
        return Result.ok(order.getId());
    }
}
