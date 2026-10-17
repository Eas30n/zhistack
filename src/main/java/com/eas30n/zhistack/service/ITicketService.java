package com.eas30n.zhistack.service;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Ticket;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface ITicketService extends IService<Ticket> {

    Result queryTicketOfActivity(Long activityId);

    void addSeckillTicket(Ticket ticket);
}
