package com.eas30n.zhistack.config;

import com.eas30n.zhistack.entity.Activity;
import com.eas30n.zhistack.mapper.ActivityMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.eas30n.zhistack.utils.RedisConstants.ACTIVITY_GEO_KEY;

/**
 * 启动时从 MySQL 重建活动 GEO 数据：GEO 是派生数据，源在数据库，
 * Redis 被清空或首次部署（docker-compose）时自动补齐，避免"附近"列表为空。
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GeoDataInitializer implements ApplicationRunner {

    private final StringRedisTemplate stringRedisTemplate;
    private final ActivityMapper activityMapper;

    @Override
    public void run(ApplicationArguments args) {
        List<Activity> activities = activityMapper.selectList(null);
        int added = 0;
        for (Activity a : activities) {
            if (a.getX() == null || a.getY() == null || a.getTypeId() == null) {
                continue;
            }
            String key = ACTIVITY_GEO_KEY + a.getTypeId();
            stringRedisTemplate.execute((org.springframework.data.redis.core.RedisCallback<Void>) conn -> {
                conn.geoAdd(key.getBytes(), new RedisGeoCommands.GeoLocation<>(String.valueOf(a.getId()).getBytes(), new Point(a.getX(), a.getY())));
                return null;
            });
            added++;
        }
        log.info("GEO 数据初始化完成，写入 {} 条活动坐标", added);
    }
}
