package com.eas30n.zhistack.utils;

public class RedisConstants {
    public static final String LOGIN_CODE_KEY = "login:code:";
    public static final Long LOGIN_CODE_TTL = 2L;
    public static final String LOGIN_USER_KEY = "login:token:";
    public static final Long LOGIN_USER_TTL = 7 * 24 * 60L;

    public static final Long CACHE_NULL_TTL = 2L;

    public static final Long CACHE_ACTIVITY_TTL = 30L;
    public static final String CACHE_ACTIVITY_KEY = "cache:activity:";
    public static final String CACHE_ACTIVITY_CATEGORY_KEY = "cache:activity:type:";

    public static final String LOCK_ACTIVITY_KEY = "lock:activity:";
    public static final Long LOCK_ACTIVITY_TTL = 10L;

    public static final String SECKILL_STOCK_KEY = "seckill:stock:";
    // 秒杀订单消息队列（stream.orders 必须与 seckill.lua 中 XADD 的 key 保持一致）
    public static final String SECKILL_ORDER_STREAM_KEY = "stream.orders";
    public static final String POST_LIKED_KEY = "post:liked:";
    public static final String FEED_KEY = "feed:";
    public static final String ACTIVITY_GEO_KEY = "activity:geo:";
    public static final String USER_SIGN_KEY = "sign:";
}
