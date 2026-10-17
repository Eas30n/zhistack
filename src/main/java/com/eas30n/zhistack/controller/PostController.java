package com.eas30n.zhistack.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.dto.UserDTO;
import com.eas30n.zhistack.entity.Post;
import com.eas30n.zhistack.entity.User;
import com.eas30n.zhistack.service.IPostService;
import com.eas30n.zhistack.service.IUserService;
import com.eas30n.zhistack.utils.SystemConstants;
import com.eas30n.zhistack.utils.UserHolder;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/post")
public class PostController {

    @Resource
    private IPostService postService;

    /**
     * 按活动分页查询帖子（活动详情页"网友评价"动态数据源，替代课程版写死演示块）。
     */
    @GetMapping("/of/activity/{id}")
    public Result queryPostsOfActivity(@PathVariable("id") Long activityId,
                                       @RequestParam("page") long page,
                                       @RequestParam("pageSize") long pageSize) {
        com.baomidou.mybatisplus.extension.plugins.pagination.Page<Post> p =
                new com.baomidou.mybatisplus.extension.plugins.pagination.Page<>(page, pageSize);
        postService.page(p, new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<Post>()
                .eq(Post::getActivityId, activityId)
                .orderByDesc(Post::getCreateTime));
        return Result.ok(p.getRecords());
    }


    @PostMapping
    public Result savePost(@RequestBody Post post) {
        return postService.savePost(post);
    }

    @PutMapping("/like/{id}")
    public Result likePost(@PathVariable("id") Long id) {
        //
        return postService.likePost(id);
    }

    @GetMapping("/of/me")
    public Result queryMyPost(@RequestParam(value = "current", defaultValue = "1") Integer current) {
        // 获取登录用户
        UserDTO user = UserHolder.getUser();
        // 根据用户查询
        Page<Post> page = postService.query()
                .eq("user_id", user.getId()).page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
        // 获取当前页数据
        List<Post> records = page.getRecords();
        return Result.ok(records);
    }

    @GetMapping("/hot")
    public Result queryHotPost(@RequestParam(value = "current", defaultValue = "1") Integer current) {
        return postService.queryHotPost(current);
    }

    @GetMapping("/{id}")
    public Result queryPostById(@PathVariable("id") Long id) {
        return postService.queryPostById(id);
    }
    @GetMapping("/likes/{id}")
    public Result queryPostLikes(@PathVariable("id") Long id) {
        return postService.queryPostLikes(id);
    }

    /**
     *
     * @param current
     * @param id
     * @return
     */
    @GetMapping("/of/user")
    public Result queryPostByUserId(
            @RequestParam(value = "current", defaultValue = "1") Integer current,
            @RequestParam("id") Long id) {
        // 根据用户查询
        Page<Post> page = postService.query()
                .eq("user_id", id).page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
        // 获取当前页数据
        List<Post> records = page.getRecords();
        return Result.ok(records);
    }

    /**
     * 滚动分页
     * @param max
     * @param offset
     * @return
     */
    @GetMapping("/of/follow")
    public Result queryPostOfFollow(
            @RequestParam("lastId") Long max,   //上一次的最小时间，本次的最大时间
            @RequestParam(value = "offset", defaultValue = "0") Integer offset) {   //偏移量，要跳过的个数 ，第一次默认为0
        return postService.queryPostOfFollow(max, offset);
    }
}
