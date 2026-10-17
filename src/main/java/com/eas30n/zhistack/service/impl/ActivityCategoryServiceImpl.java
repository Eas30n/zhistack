package com.eas30n.zhistack.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.json.JSONUtil;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.ActivityCategory;
import com.eas30n.zhistack.mapper.ActivityCategoryMapper;
import com.eas30n.zhistack.service.IActivityCategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.utils.RedisConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
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
public class ActivityCategoryServiceImpl extends ServiceImpl<ActivityCategoryMapper, ActivityCategory> implements IActivityCategoryService {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public Result queryTypeList() {
        //opsForList写法
        //public static final String CACHE_ACTIVITY_CATEGORY_KEY = "cache:activity:type:";

        String key = RedisConstants.CACHE_ACTIVITY_CATEGORY_KEY;
        //1. 从redis中查询 店铺类型
        List<String> activityCategoryJson = stringRedisTemplate.opsForList().range(key, 0, -1);

        //2.判断缓存中是否存在
        if (CollectionUtil.isNotEmpty(activityCategoryJson)) {
            //Json转为对象,排序后返回
            /**
             * Redis
             *  ↓
             * 拿到 List<String>
             *  ↓
             * JSON字符串 → ActivityCategory对象
             *  ↓
             * 按照 sort 排序
             *  ↓
             * 返回给前端
             */
            List<ActivityCategory> activityCategorys = JSONUtil.toList(activityCategoryJson.toString(), ActivityCategory.class);   //把 JSON 数据转换成 List<ActivityCategory>
            Collections.sort(activityCategorys, (((o1, o2) -> o1.getSort() - o2.getSort())));         //sort小的 → 排前面  sort大的 → 排后面
            return Result.ok(activityCategorys);
        }

        // 3. 没有就向数据库查询 MP的query()拿来用
        List<ActivityCategory> activityCategorys = query().orderByAsc("sort").list();

        // 4. 不存在，返回错误
        if (CollectionUtil.isEmpty(activityCategorys)) {
            return Result.fail("商铺类型不存在...");
        }
            // 5.存在， 写入Redis，这里使用Redis的List类型，String类型，就是直接所有都写在一起，对内存开销比较大。
            // 要将List中的每个元素(元素类型ActivityCategory) ，每个元素都要单独转成JSON，使用stream流的map映射
            // Hutools里的 BeanUtil.copyToList 本来想模仿UserService中的写法，
            // 传入一个CopyOptions的，但是setFieldValueEditor貌似只对beanToMap有效
            // 改用流的形式转换每个list元素
            List<String> activityCategorysJson = activityCategorys.stream()
                    .map(activityCategory -> JSONUtil.toJsonStr(activityCategory))      //把每一个 ActivityCategory 转换成 JSON 字符串。
                    .collect(Collectors.toList());                                   //把转换后的结果重新收集成一个 List。
            // 因为从数据库读出来的时候已经是按照顺序读出来的，这里想要维持顺序必须从右边push，类似队列
            stringRedisTemplate.opsForList().rightPushAll(key, activityCategorysJson);
            // 5. 返回
            return Result.ok(activityCategorys);
    }
}
