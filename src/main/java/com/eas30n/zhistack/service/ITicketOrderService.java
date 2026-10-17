package com.eas30n.zhistack.service;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.TicketOrder;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface ITicketOrderService extends IService<TicketOrder> {

    Result seckillTicket(Long ticketId);


    /**
     * 秒杀下单落库（供 Redis Stream 消费者异步调用）。
     * 消费者线程无登录上下文，userId/orderId 均来自消息体，不能再依赖 UserHolder。
     *
     * @param userId    下单用户 id
     * @param ticketId 门票 id
     * @param orderId   订单 id（Lua 阶段已生成，需与返回给用户的一致）
     * @return 下单结果
     */
    Result createTicketOrder(Long userId, Long ticketId, Long orderId);
}
