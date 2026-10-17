package com.eas30n.zhistack.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.dto.UserDTO;
import com.eas30n.zhistack.entity.Follow;
import com.eas30n.zhistack.mapper.FollowMapper;
import com.eas30n.zhistack.service.IFollowService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.service.IUserService;
import com.eas30n.zhistack.utils.UserHolder;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements IFollowService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;
    @Resource
    private IUserService userService;


    @Override
    public Result follow(Long followUserId, Boolean isFollow) {
        //获取当前用户
        Long userId = UserHolder.getUser().getId();
        String key = "follows:" + userId;
        
        //1. 判断关注还是取关
        if (isFollow){
            //2. 关注，新增数据
            Follow follow = new Follow();
            follow.setUserId(userId);   //当前用户id
            follow.setFollowUserId(followUserId);   //关注用户id
            boolean isSuccess = save(follow);
            if (isSuccess){
                //成功 把关注id保存到redis的set集合中   sadd userId followUserId
                stringRedisTemplate.opsForSet().add(key,followUserId.toString());
            }
        }else {
            //3. 取消关注，删除数据 delete from tb_follow where user_id = ? and follow_user_id = ?
            boolean isSuccess = remove(new QueryWrapper<Follow>()
                    .eq("user_id", userId).eq("follow_user_id", followUserId));
            if (isSuccess){
                //取关 删除redis的set集合中的id
                stringRedisTemplate.opsForSet().remove(key,followUserId.toString());
            }
        }
        return Result.ok();
    }

    @Override
    public Result isFollow(Long followUserId) {
        //获取当前用户
        Long userId = UserHolder.getUser().getId();

        //2. 查询是否关注 select  count(*) from tb_follow where user_id = ? and follow_user_id = ?
        Integer count = query().eq("user_id", userId).eq("follow_user_id", followUserId).count();

        //3.判断
        return Result.ok(count > 0);
    }

    @Override
    public Result followCommons(Long id) { //目标用户id
        //1. 获取当前用户
        Long userId = UserHolder.getUser().getId();
        String key = "follows:" + userId;    //当前用户

        //2. 求交集
        String key2 = "follows:" + id;   //目标用户
        Set<String> intersect = stringRedisTemplate.opsForSet().intersect(key, key2);

        // 3. 判断集合是否为空
        if (intersect == null || intersect.isEmpty()){
            //无 交集
            return Result.ok(Collections.emptyList());
        }

        //4. 解析id集合 转long集合
        List<Long> ids = intersect.stream().map(Long::valueOf).collect(Collectors.toList());

        //5. 查询用户
        List<UserDTO> users = userService.listByIds(ids)
                .stream()
                .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
                .collect(Collectors.toList());
        return Result.ok(users);
    }
}
