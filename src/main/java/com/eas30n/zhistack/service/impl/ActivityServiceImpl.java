package com.eas30n.zhistack.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Activity;
import com.eas30n.zhistack.mapper.ActivityMapper;
import com.eas30n.zhistack.service.IActivityService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.utils.CacheClient;
import com.eas30n.zhistack.utils.RedisConstants;
import com.eas30n.zhistack.utils.RedisData;
import com.eas30n.zhistack.utils.SystemConstants;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.domain.geo.GeoReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static com.eas30n.zhistack.utils.RedisConstants.*;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Service
public class ActivityServiceImpl extends ServiceImpl<ActivityMapper, Activity> implements IActivityService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private CacheClient cacheClient;    //注入缓存工具类

    @Override
    public Result queryById(Long id) {

        //缓存穿透
        Activity activity = cacheClient.queryWithPassThrough(CACHE_ACTIVITY_KEY, id, Activity.class, this::getById ,CACHE_ACTIVITY_TTL, TimeUnit.MINUTES);

        //用互斥锁解决缓存击穿
        //Activity activity = queryWithMutex(id);

        //逻辑过期解决缓存击穿
        //Activity activity = cacheClient.queryWithLogicalExpire(CACHE_ACTIVITY_KEY, id, Activity.class, this::getById ,CACHE_ACTIVITY_TTL, TimeUnit.MINUTES);

        if (activity == null) {
            return Result.fail("店铺不存在！");
        }

        //7.返回
        return Result.ok(activity);
    }

    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10); //线程池

    //逻辑过期解决缓存击穿
    /*public Activity queryWithLogicalExpire(Long id) {
        //1.从redis中查询商铺
        String key = RedisConstants.CACHE_ACTIVITY_KEY + id;
        String activityJson = stringRedisTemplate.opsForValue().get(key);

        //2.判断是否存在
        if (StrUtil.isBlank(activityJson)) {
            //3.不存在，返回错误
            return null;
        }

        //4.命中，需要先把json反序列化为对象
        RedisData redisData = JSONUtil.toBean(activityJson, RedisData.class);   //把 JSON 数据转换成 RedisData
        Activity activity = JSONUtil.toBean((JSONObject)redisData.getData(), Activity.class);   //把 JSON 数据转换成 Activity
        LocalDateTime expireTime = redisData.getExpireTime();   //获取过期时间

        //5.判断是否过期
        if (expireTime.isAfter(LocalDateTime.now())) {
            //5.1 未过期，直接返回店铺信息
            return activity;
        }

        //5.2 已过期，需要缓存重建
        //6.重建缓存

        //6.1 获取互斥锁
        String lockKey = RedisConstants.LOCK_ACTIVITY_KEY + id;
        boolean isLock = tryLock(lockKey);  //尝试获取锁

        //6.2判断锁是否成功
        if (isLock) {   //获取锁成功
            // 6.3成功，开启独立线程，实现缓存重建
            CACHE_REBUILD_EXECUTOR.submit(() -> {       // 创建线程
                try {
                    //缓存重建
                    this.saveActivity2Redis( id,20L);
                }catch (Exception e){
                    throw new RuntimeException(e);
                }finally {
                    //释放锁
                    unLock(lockKey);
                }
            });
        }

        //6.4返回过期的店铺信息
        return activity;
    }*/

    //互斥锁
    /*public Activity queryWithMutex(Long id) {
        //1.从redis查询商铺缓存
        String key = RedisConstants.CACHE_ACTIVITY_KEY + id;
        String activityJson = stringRedisTemplate.opsForValue().get(key);

        if (StrUtil.isNotBlank(activityJson)) {
            //存在，返回
            Activity activity = JSONUtil.toBean(activityJson, Activity.class);
            return activity;
        }

        //判断命中是否为空值
        if (activityJson != null) {
            return null;
        }

        //实现缓存重建
        //获取互斥锁
        String lockKey = RedisConstants.LOCK_ACTIVITY_KEY + id;
        Activity activity = null;
        boolean isLock = false;
        try {
            isLock = tryLock(lockKey);

            //失败，则休眠并重试
            if (!isLock) {
                Thread.sleep(50);
                return queryWithMutex(id);
            }
            //双重检查：拿到锁后再查一次redis，缓存可能已被其他线程重建
            activityJson = stringRedisTemplate.opsForValue().get(key);
            if (activityJson != null) {
                return StrUtil.isNotBlank(activityJson) ? JSONUtil.toBean(activityJson, Activity.class) : null;
            }

            //不存在，根据id查询你数据库
            activity = getById(id);

            if (activity == null) {
                //将空值写入redis
                stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(activity), RedisConstants.CACHE_NULL_TTL, TimeUnit.MINUTES);
                //不存在，返回错误信息
                return null;
            }

            //然后再写入redis
            stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(activity), RedisConstants.CACHE_ACTIVITY_TTL, TimeUnit.MINUTES);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            //释放互斥锁
            unLock(lockKey);
        }

        //返回
        return activity;
    }*/

   /* private boolean tryLock(String key) {
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1");
        return Boolean.TRUE.equals(flag);
    }

    private void unLock(String key) {
        stringRedisTemplate.delete(key);
    }*/


    //缓存穿透
/*
    public Activity queryWithPassThrough(Long id) {
        //1.从redis中查询商铺
        String key = RedisConstants.CACHE_ACTIVITY_KEY + id;
        String activityJson = stringRedisTemplate.opsForValue().get(key);

        //2.判断是否存在
        if (StrUtil.isNotBlank(activityJson)) {
            //3.存在，转成java对象返回
            Activity activity = JSONUtil.toBean(activityJson, Activity.class);
            return activity;
        }

        //判断命中是否是空值
        if (activityJson != null) {     //空值不等于 null
            return null;
        }

        //4.不存在，根据id查询数据库
        Activity activity = getById(id);        //由mybatis-plus实现

        //5.数据库不存在，返回错误
        if (activity == null) {
            //将空值写入缓存，解决缓存穿透
            stringRedisTemplate.opsForValue().set(key,"",CACHE_NULL_TTL, TimeUnit.MINUTES);
            //返回错误
            return null;
        }

        //6.存在，写入redis
        stringRedisTemplate.opsForValue().set(key,JSONUtil.toJsonStr( activity),CACHE_ACTIVITY_TTL, TimeUnit.MINUTES);   //把activity转成json存为value

        //7.返回
        return activity;
    }
*/



    private void saveActivity2Redis(Long id, Long expireSeconds) {
        //1.查询店铺数据
        Activity activity = getById(id);

        //2.封装逻辑过期时间
        RedisData redisData = new RedisData();
        redisData.setData(activity);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(expireSeconds));

        //3.写入redis
        stringRedisTemplate.opsForValue().set(RedisConstants.CACHE_ACTIVITY_KEY + id, JSONUtil.toJsonStr(redisData));
    }

    @Override
    @Transactional
    public Result update(Activity activity) {
        Long id = activity.getId();
        if (id == null) {
            return Result.fail("店铺id不能为空");
        }
        //1.更新数据库
        updateById(activity);

        //2.删除缓存
        stringRedisTemplate.delete(RedisConstants.CACHE_ACTIVITY_KEY + id);
        return Result.ok();
    }

    @Override
    public Result queryActivityByType(Integer typeId, Integer current, Double x, Double y) {
        //1. 判断是否需要根据坐标查询
        if(x == null || y == null){
            // 不需要根据坐标查询, 按照数据库查询
            Page<Activity> page = query()
                    .eq("type_id", typeId)
                    .orderByDesc("update_time")
                    .page(new Page<>(current, SystemConstants.DEFAULT_PAGE_SIZE));
            //返回结果
            return Result.ok(page.getRecords());
        }

        //2.计算分页参数
        int from = (current - 1) * SystemConstants.DEFAULT_PAGE_SIZE;   // 计算分页的起始位置
        int end = current * SystemConstants.DEFAULT_PAGE_SIZE;   // 计算分页的结束位置

        //3. 查询redis 按照距离排序 分页 结果：activityId distance
        String key = ACTIVITY_GEO_KEY + typeId;
        GeoResults<RedisGeoCommands.GeoLocation<String>> results = stringRedisTemplate.opsForGeo()
                .search(
                        key,
                        GeoReference.fromCoordinate(x, y),
                        new Distance(5000),  // 5公里范围内
                        RedisGeoCommands.GeoSearchCommandArgs.newGeoSearchArgs().includeDistance().limit(end)
                );
        //4. 解析出id
        if (results == null) {  // 没有结果
            return Result.ok(Collections.emptyList());
        }
        List<GeoResult<RedisGeoCommands.GeoLocation<String>>> list = results.getContent();
        if (list.size() <= from) {  // 判断列表大小是否小于等于起始位置，即没有分页数据
            // 没有下一页了,结束
            return Result.ok(Collections.emptyList());
        }

        //4.1 截取 from - end 的部分
        List<Long> ids = new ArrayList<>(list.size());
        Map<Long, Distance> distanceMap = new HashMap<>(list.size());
        list.stream().skip(from).forEach(result -> {
            //4.2 获取店铺id
            String activityIdStr = result.getContent().getName();
            ids.add(Long.valueOf(activityIdStr));
            //4.3 获取距离，并以id为key存入map
            distanceMap.put(Long.valueOf(activityIdStr), result.getDistance());
        });
        //5. 根据id查询店铺
        String idStr = StrUtil.join(",", ids);  // 将ids转换为逗号分隔的字符串
        List<Activity> activitys = query().in("id", ids).last("ORDER BY FIELD(id, " + idStr + ")").list();  // 根据id查询店铺
        for (Activity activity : activitys) {
            activity.setDistance(distanceMap.get(activity.getId()).getValue()); // 设置距离
        }

        //6. 返回
        return Result.ok(activitys);
    }
}
