package com.eas30n.zhistack.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.eas30n.zhistack.entity.Ticket;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface TicketMapper extends BaseMapper<Ticket> {

    List<Ticket> queryTicketOfActivity(@Param("activityId") Long activityId);
}
