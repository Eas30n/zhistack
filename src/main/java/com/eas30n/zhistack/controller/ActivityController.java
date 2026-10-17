package com.eas30n.zhistack.controller;


import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Activity;
import com.eas30n.zhistack.service.IActivityService;
import com.eas30n.zhistack.utils.SystemConstants;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Resource
    public IActivityService activityService;

    /**
     * 根据id查询商铺信息
     * @param id 商铺id
     * @return 商铺详情数据
     */
    @GetMapping("/{id}")
    public Result queryActivityById(@PathVariable("id") Long id) {
        return activityService.queryById(id);
    }

    /**
     * 新增商铺信息
     * @param activity 商铺数据
     * @return 商铺id
     */
    @PostMapping
    public Result saveActivity(@RequestBody Activity activity) {
        // 写入数据库
        activityService.save(activity);
        // 返回店铺id
        return Result.ok(activity.getId());
    }

    /**
     * 更新商铺信息
     * @param activity 商铺数据
     * @return 无
     */
    @PutMapping
    public Result updateActivity(@RequestBody Activity activity) {
        // 写入数据库
        return activityService.update(activity);
    }

    /**
     * 根据商铺类型分页查询商铺信息
     * @param typeId 商铺类型
     * @param current 页码
     * @return 商铺列表
     */
    @GetMapping("/of/type")
    public Result queryActivityByType(
            @RequestParam("typeId") Integer typeId,
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam(value = "x",required = false) Double x,
            @RequestParam(value = "y",required = false) Double y
    ) {
        return activityService.queryActivityByType(typeId, current, x, y);
    }

    /**
     * 根据商铺名称关键字分页查询商铺信息
     * @param name 商铺名称关键字
     * @param current 页码
     * @return 商铺列表
     */
    @GetMapping("/of/name")
    public Result queryActivityByName(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "current", defaultValue = "1") Integer current
    ) {
        // 根据类型分页查询
        Page<Activity> page = activityService.query()
                .like(StrUtil.isNotBlank(name), "name", name)
                .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
        // 返回数据
        return Result.ok(page.getRecords());
    }
}
