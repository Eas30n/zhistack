package com.eas30n.zhistack.utils;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.eas30n.zhistack.entity.Activity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import static com.eas30n.zhistack.utils.RedisConstants.CACHE_NULL_TTL;
import static com.eas30n.zhistack.utils.RedisConstants.CACHE_ACTIVITY_TTL;

/**
 * 缓存工具类
 */
@Component
@Slf4j
public class CacheClient {
    private final StringRedisTemplate stringRedisTemplate;


    public CacheClient(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    // 设置缓存
    public void set(String key, Object value, Long time, TimeUnit unit) {
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value), time, unit);
    }

    // 逻辑过期
    public void setWithLogicalExpire(String key, Object value, Long time, TimeUnit unit) {
        //设置逻辑过期
        RedisData redisData = new RedisData();
        redisData.setData(value);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds( time)));

        //写入redis
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }

    //缓存穿透
    public <R, ID> R queryWithPassThrough(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback , Long time, TimeUnit unit    ) {
        //1.从redis中查询商铺
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);

        //2.判断是否存在
        if (StrUtil.isNotBlank(json)) {
            //3.存在，转成java对象返回
            return JSONUtil.toBean(json, type);
        }

        //判断命中是否是空值
        if (json != null) {     //空值不等于 null
            return null;
        }

        //4.不存在，根据id查询数据库
        R r = dbFallback.apply(id);

        //5.数据库不存在，返回错误
        if (r == null) {
            //将空值写入缓存，解决缓存穿透
            stringRedisTemplate.opsForValue().set(key,"",CACHE_NULL_TTL, TimeUnit.MINUTES);
            //返回错误
            return null;
        }

        //6.存在，写入redis
        this.set(key, r, time, unit);
        //7.返回
        return r;
    }

    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10); //线程池

    //逻辑过期解决缓存击穿
    public <R, ID> R queryWithLogicalExpire( String keyPrefix ,ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit unit) {
        //1.从redis中查询商铺
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);

        //2.判断是否存在
        if (StrUtil.isBlank(json)) {
            //3.不存在，返回错误
            return null;
        }

        //4.命中，需要先把json反序列化为对象
        RedisData redisData = JSONUtil.toBean( json, RedisData.class);   //把 JSON 数据转换成 RedisData
        R r = JSONUtil.toBean((JSONObject)redisData.getData(), type);   //把 JSON 数据转换成 type
        LocalDateTime expireTime = redisData.getExpireTime();   //获取过期时间

        //5.判断是否过期
        if (expireTime.isAfter(LocalDateTime.now())) {
            //5.1 未过期，直接返回店铺信息
            return r;
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
                    //查询数据库
                    R r1 = dbFallback.apply(id);
                    //写入redis
                    this.setWithLogicalExpire(key, r1, time, unit);
                }catch (Exception e){   //异常处理
                    throw new RuntimeException(e);
                }finally {
                    //释放锁
                    unLock(lockKey);
                }
            });
        }

        //6.4返回过期的店铺信息
        return r;
    }

    private boolean tryLock(String key) {
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1");
        return Boolean.TRUE.equals(flag);
    }

    private void unLock(String key) {
        stringRedisTemplate.delete(key);
    }
}
