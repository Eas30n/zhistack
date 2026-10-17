package com.eas30n.zhistack.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.BooleanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.dto.ScrollResult;
import com.eas30n.zhistack.dto.UserDTO;
import com.eas30n.zhistack.entity.Post;
import com.eas30n.zhistack.entity.Follow;
import com.eas30n.zhistack.entity.User;
import com.eas30n.zhistack.mapper.PostMapper;
import com.eas30n.zhistack.service.IPostService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.service.IFollowService;
import com.eas30n.zhistack.service.IUserService;
import com.eas30n.zhistack.utils.SystemConstants;
import com.eas30n.zhistack.utils.UserHolder;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.swing.plaf.basic.BasicSliderUI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.eas30n.zhistack.utils.RedisConstants.POST_LIKED_KEY;
import static com.eas30n.zhistack.utils.RedisConstants.FEED_KEY;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Service
public class PostServiceImpl extends ServiceImpl<PostMapper, Post> implements IPostService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private IUserService userService;

    @Resource
    private IFollowService followService;

    @Override
    public Result queryHotPost(Integer current) {
        // 根据用户查询
        Page<Post> page = query()
                .orderByDesc("liked")
                .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
        // 获取当前页数据
        List<Post> records = page.getRecords();
        // 查询用户
        records.forEach(this::fillPostAuthor);
        return Result.ok(records);
    }

    @Override
    public Result queryPostById(Long id) {
        //1. 查询post
        Post post = getById(id);
        if (post == null){
            return Result.fail("笔记不存在");

            //查询是否点过赞
        }
        isPostLiked(post);

        //2. 查询post有关的用户
        fillPostAuthor(post);
        return Result.ok(post);
    }

    /**
     * 根据 post 的 userId 查询用户，并填充作者昵称与头像
     */
    private void fillPostAuthor(Post post) {
        User user = userService.getById(post.getUserId());
        post.setName(user.getNickName());
        post.setIcon(user.getIcon());
    }

    private void isPostLiked(Post post) {
        //1. 获取登录用户
        UserDTO user = UserHolder.getUser();
        if (user == null){
            return; //用户未登录，无需查询是否点赞
        }
        Long userId = UserHolder.getUser().getId(); //获取当前用户id

        //2. 判断当前用户是否点过赞
        String key = POST_LIKED_KEY + post.getId();
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
        post.setIsLike(score !=  null);
    }

    @Override
    public Result likePost(Long id) {
        //1. 获取登录用户
        Long userId = UserHolder.getUser().getId();

        //2. 判断当前用户是否点过赞
        String key = POST_LIKED_KEY + id;
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
        if(score == null){
            //3. 如果没点过赞，可点赞
            //3.1 数据库点赞数+1
            boolean isSuccess = update().setSql("liked = liked + 1").eq("id", id).update();

            //3.2 保存用户点赞到Redis的zset集合中 zadd key value score
            if(isSuccess){  // 更新成功
                stringRedisTemplate.opsForZSet().add(key, userId.toString(), System.currentTimeMillis());
            }
        }else {
            //4. 如果点过赞，则取消点赞
            //4.1 数据库点赞数-1
            boolean isSuccess = update().setSql("liked = liked - 1").eq("id", id).update();

            //4.2 把用户从Redis的set集合中移除
            if(isSuccess){
                stringRedisTemplate.opsForZSet().remove(key, userId.toString());
            }
        }
        return Result.ok();
    }


    @Override
    public Result queryPostLikes(Long id) {
        String key = POST_LIKED_KEY + id;
        // 1. 查询top5的点赞用户 zrange key start end 点赞排行有序 故用zset
        Set<String> top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);

        if(top5 == null || top5.isEmpty()){
            // 2. 不存在，返回一个空集合
            return Result.ok(Collections.emptyList());
        }
        //2.1. 解析出用户id
        List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());

        String idStr = StrUtil.join(",", ids); //

        //3. 根据用户id查询用户
        List<UserDTO> userDTOS = userService.query()
                .in("id", ids) //筛选在ids集合中的用户
                .last("ORDER BY FIELD ( id, "+ idStr +")").list() //使用MySQL的FIELD函数，强制按 idStr 中的ID顺序排序（而非默认排序）
                .stream()
                .map(user -> BeanUtil.copyProperties(user, UserDTO.class)) //用 BeanUtil 将 User 拷贝为 UserDTO，避免暴露敏感字段（如密码
                .collect(Collectors.toList());

        //4. 返回
        return Result.ok( userDTOS);
    }

    @Override
    public Result savePost(Post post) {
        //1. 获取登录用户
        UserDTO user = UserHolder.getUser();
        post.setUserId(user.getId());

        //2. 保存参会分享
        boolean isSuccess = save(post);
        if(!isSuccess){
            return Result.fail("新增笔记失败");
        }

        //3. 查询笔记作者的粉丝 select * from tb_follow where follow_user_id = ?
        List<Follow> follows = followService.query().eq("follow_user_id", user.getId()).list();

        //4. 推送笔记id给粉丝
        for (Follow follow : follows) {
            //4.1. 获取粉丝id
            Long userId = follow.getUserId();
            //4.2. 给粉丝id发送笔记id
            String key = FEED_KEY + userId;
            stringRedisTemplate.opsForZSet().add(key, post.getId().toString(), System.currentTimeMillis());
        }

        //5. 返回id
        return Result.ok(post.getId());
    }

    /**
     * 滚动分页
     * @param max
     * @param offset
     * @return
     */
    @Override
    public Result queryPostOfFollow(Long max, Integer offset) {
        //1. 获取当前用户
        Long userId = UserHolder.getUser().getId();

        //2. 查询收件箱 ZREVRANGEBYSCORE key max min LIMIT offset count
        String key = FEED_KEY + userId;
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringRedisTemplate.opsForZSet()
                .reverseRangeByScoreWithScores(key, 0, max, offset, 2);

        //3. 非空判断
        if(typedTuples == null || typedTuples.isEmpty()){
            return Result.ok();
        }

        //4. 解析数据：postId，minTime(最小时间戳) ，offset
        List<Long> ids = new ArrayList<>(typedTuples.size());   //创建一个集合，用于存储postId
        long minTime = 0;   //最小时间戳 初始化为0
        int os = 1;     //偏移量 初始化为1 跟最小时间戳相同，因为最小时间戳是最新的时间戳，所以从1开始，起码有他自己

        for (ZSetOperations.TypedTuple<String> tuple : typedTuples){
            //4.1. 获取id
            ids.add(Long.valueOf(tuple.getValue()));
            //4.2. 获取分数(时间戳)
            long time = tuple.getScore().longValue();
            if(time == minTime){    //最小时间戳相同，偏移量+1
                os++;
            }else {
                minTime = time;
                os = 1;
            }
            minTime = time;
        }


        //5. 根据postId查询post 需要排序
        String idStr = StrUtil.join(",", ids);
        List<Post> posts = query().in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list();


        for (Post post : posts) {
            //5.1. 查询post作者
            fillPostAuthor(post);
            isPostLiked( post);
        }

        //6. 封装并返回
        ScrollResult r = new ScrollResult();
        r.setList(posts);
        r.setOffset(os);
        r.setMinTime(minTime);
        return Result.ok(r);
    }
}
