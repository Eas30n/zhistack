package com.eas30n.zhistack.controller;


import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.service.ITicketOrderService;
import com.eas30n.zhistack.service.impl.TicketOrderServiceImpl;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@RestController
@RequestMapping("/ticket-order")
public class TicketOrderController {
    @Resource
    private ITicketOrderService ticketOrderService;

    @PostMapping("seckill/{id}")
    public Result seckillTicket(@PathVariable("id") Long ticketId) {

        return ticketOrderService.seckillTicket(ticketId);
    }
}
