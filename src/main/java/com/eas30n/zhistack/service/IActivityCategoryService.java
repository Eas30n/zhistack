package com.eas30n.zhistack.service;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.ActivityCategory;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface IActivityCategoryService extends IService<ActivityCategory> {

    Result queryTypeList();
}
