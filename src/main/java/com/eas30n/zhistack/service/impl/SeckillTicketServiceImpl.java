package com.eas30n.zhistack.service.impl;

import com.eas30n.zhistack.entity.SeckillTicket;
import com.eas30n.zhistack.mapper.SeckillTicketMapper;
import com.eas30n.zhistack.service.ISeckillTicketService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 秒杀门票表，与门票是一对一关系 服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2022-01-04
 */
@Service
public class SeckillTicketServiceImpl extends ServiceImpl<SeckillTicketMapper, SeckillTicket> implements ISeckillTicketService {

}
