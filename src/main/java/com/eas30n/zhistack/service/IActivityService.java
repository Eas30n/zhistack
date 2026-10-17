package com.eas30n.zhistack.service;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Activity;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface IActivityService extends IService<Activity> {

    /**
     * 根据id查询商铺信息
     * @param id 商铺id
     * @return 商铺详情数据
     */
    Result queryById(Long id);

    /**
     * 新增商铺信息
     * @param activity 商铺数据
     * @return 商铺id
     */
    Result update(Activity activity);

    Result queryActivityByType(Integer typeId, Integer current, Double x, Double y);
}
