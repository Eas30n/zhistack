package com.eas30n.zhistack;

import com.eas30n.zhistack.entity.Activity;
import com.eas30n.zhistack.service.IActivityService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.StringRedisTemplate;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootTest
class ZhiStackApplicationTests {

    @Resource
    private IActivityService activityService;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Test
    public void loadActivityData() {
        //1.查询所有店铺信息
        List<Activity> list = activityService.list();
        System.out.println(">>> 店铺总数 = " + list.size());
        //2.把店铺分组，得到值是id集合的map
        Map<Long, List<Activity>> map = list.stream().collect(Collectors.groupingBy(Activity::getTypeId));
        //3.把同类型的店铺数据写入redis的GEO
        for (Map.Entry<Long, List<Activity>> entry : map.entrySet()) {
            Long typeId = entry.getKey();
            String key = "activity:geo:" + typeId;
            List<RedisGeoCommands.GeoLocation<String>> locations = entry.getValue().stream()
                    .map(activity -> new RedisGeoCommands.GeoLocation<>(
                            activity.getId().toString(),
                            new Point(activity.getX(), activity.getY())))
                    .collect(Collectors.toList());
            Long count = stringRedisTemplate.opsForGeo().add(key, locations);
            System.out.println(">>> " + key + " 写入条数 = " + count);
        }
    }
}
