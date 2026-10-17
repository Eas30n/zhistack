package com.eas30n.zhistack.controller;


import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.ActivityCategory;
import com.eas30n.zhistack.service.IActivityCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@RestController
@RequestMapping("/activity-category")
public class ActivityCategoryController {
    @Resource
    private IActivityCategoryService typeService;

    @GetMapping("list")
    public Result queryTypeList() {

        return typeService.queryTypeList();
    }
}
