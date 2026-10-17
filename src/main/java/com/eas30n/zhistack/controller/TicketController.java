package com.eas30n.zhistack.controller;


import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Ticket;
import com.eas30n.zhistack.service.ITicketService;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/ticket")
public class TicketController {

    @Resource
    private ITicketService ticketService;

    /**
     * 新增普通票
     * @param ticket 门票信息
     * @return 门票id
     */
    @PostMapping
    public Result addTicket(@RequestBody Ticket ticket) {
        ticketService.save(ticket);
        return Result.ok(ticket.getId());
    }

    /**
     * 新增秒杀票
     * @param ticket 门票信息，包含秒杀信息
     * @return 门票id
     */
    @PostMapping("seckill")
    public Result addSeckillTicket(@RequestBody Ticket ticket) {
        ticketService.addSeckillTicket(ticket);
        return Result.ok(ticket.getId());
    }

    /**
     * 查询店铺的门票列表
     * @param activityId 店铺id
     * @return 门票列表
     */
    @GetMapping("/list/{activityId}")
    public Result queryTicketOfActivity(@PathVariable("activityId") Long activityId) {
       return ticketService.queryTicketOfActivity(activityId);
    }
}
