# 知栈 ZhiStack

> 技术人的经验栈 —— 线上经验分享 + 线下沙龙活动的技术社区，含沙龙免费票高并发秒杀场景。

![Java](https://img.shields.io/badge/Java-8%2F17-orange) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.3.12-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-blue) ![Redis](https://img.shields.io/badge/Redis-7-red) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 项目简介

知栈是一个面向技术人群的经验分享社区：用户发布技术经验帖、关注创作者、获取个性化 Feed；平台定期组织线下沙龙活动，提供基于 GEO 的附近活动推荐与**限量免费票高并发秒杀**。项目重点围绕"高并发下的缓存一致性与防超卖"展开工程化设计，并配有可复现的压测验证体系。

## 业务形态

- **经验分享**：技术帖发布、点赞、多级评论、关注 Feed 流推送
- **线下沙龙**：活动分类与附近活动推荐（GEO）、活动详情页、限量免费票秒杀
- **用户体系**：手机号验证码登录、学习打卡（Bitmap）、共同关注（Set）

## 快速开始

```bash
# 方式一：Docker Compose 一键启动（MySQL 自动导入 zhistack.sql，含演示数据）
docker compose up -d --build
# 访问 http://localhost:8080（nginx 托管 demo-frontend，/api 反向代理到后端 :8081）
# 国内网络可切换镜像源：BASE_REGISTRY=docker.m.daocloud.io/ docker compose up -d --build

# 方式二：本地运行
# 1. 建库：导入 src/main/resources/db/zhistack.sql
# 2. 配置：环境变量 MYSQL_HOST / MYSQL_PASSWORD / REDIS_HOST（均有本地默认值，见 application.yaml）
# 3. 启动：mvn spring-boot:run 或 java -jar target/zhistack-0.0.1-SNAPSHOT.jar
#    注：JDK 17 运行需 --add-opens java.base/java.lang.invoke=ALL-UNNAMED（MyBatis-Plus 3.4.x 兼容）

# 测试账号：任意 13x 手机号，验证码打印在后端日志（模拟短信通道）
```

## 核心技术与代码索引

| 场景 | 方案 | 代码位置 |
|---|---|---|
| 登录态 | Redis token + ThreadLocal 上下文 + **滑动过期**（活跃自动续期，7 天） | `RefreshTokenInterceptor` / `UserHolder` |
| 缓存一致性 | Cache Aside（先更库再删缓存）、空值缓存防穿透、布隆过滤器、**逻辑过期+互斥锁**防击穿、随机 TTL 防雪崩 | `CacheClient` / `ActivityServiceImpl` |
| 限量票秒杀 | **Redis Lua 原子预校验**（库存+一人一单）→ 订单号预生成 → **Stream 异步落库** → **DB 唯一索引兜底**，三层防线 | `seckill.lua` / `TicketOrderServiceImpl` / `uk_user_ticket` |
| 消费者可靠性 | 独立线程池 + 手动 ACK + pending 重试 + **NOGROUP 自愈重建**（删组演练验证） | `TicketOrderServiceImpl.SeckillOrderConsumer` |
| Feed 流 | 关注推模式 ZSet（时间戳 score）+ **时间戳+offset 翻页**，解决传统翻页穿透/重复 | `PostServiceImpl#queryFeedOfFollow` / `ScrollResult` |
| 附近活动 | Redis GEO（geohash→ZSet），启动时从 MySQL **自动重建派生数据** | `ActivityServiceImpl` / `GeoDataInitializer` |
| 共同关注 | Set 交集 `SINTER` | `FollowServiceImpl` |
| 学习打卡 | Bitmap `SETBIT`/`BITCOUNT`，月度统计位运算 | `UserController#sign` |
| 秒杀压测对照 | 刻意保留无防护对照组，实测超卖 vs 防护效果 | `BenchmarkSeckillController` / [benchmark/](benchmark/README.md) |

## 压测结论（本机可复现，脚本与报告在 benchmark/）

137 张限量票，JMeter 1000 并发：

| 对照组 | 落库订单 | 超卖 | 重复单 | 中位 RT |
|---|---|---|---|---|
| 无防护（查-判-写裸流程） | 997 | ✅ 发生 | 0 | 2050ms |
| Lua + Stream（生产实现） | **137** | ❌ 零发生 | 0 | **1207ms** |

> MySQL 写入从 1000 降至 137：无效请求在 Redis 层即被原子拦截，不触达数据库。
> 单机家用环境数据，用于组间相对比较。复现：`bash benchmark/run-benchmark.sh A` / `C`。

## 工程实践记录

1. **领域建模**：以"沙龙活动社区"为核心域统一命名（Activity/Ticket/Post），数据库、缓存 key、Lua 脚本、API 全链路一致，迁移脚本见 `db/migration_v1_zhistack.sql`
2. **JDK 17 适配**：Lombok 版本钉扎、Redisson 地址配置化、`--add-opens` 模块兼容方案
3. **并发正确性加固**：DB 唯一索引兜底、消费者组 NOGROUP 自愈、Stream 消息字段一致性修复（压测回归中发现）
4. **可复现压测体系**：无防护对照组接口 + JMeter 参数化脚本 + 三重校验口径（订单数/重复数/库存）+ HTML 报告入库
5. **派生数据自愈**：GEO 索引启动时从 MySQL 重建（`ApplicationRunner`），Redis 清空后功能不永久损坏
6. **接口补全**：活动详情页评价区由静态占位改为 `GET /post/of/activity/{id}` 真实分页查询
7. **前端品牌化**：主题层 CSS、图标/插画视觉体系、API 路径与领域命名同步
8. **登录体验**：token 滑动过期 7 天

## 已知边界

- 演示数据（用户/帖子/活动）为种子生成，用于功能展示
- 压测为单机闭环，未验证 Redis 集群 / 主从切换场景
- 部分前端入口（如"查看全部评价"跳转页）为演示占位，未接真实接口
- 图片上传为本地磁盘存储，生产需替换对象存储

## 技术栈

Spring Boot 2.3 / MyBatis-Plus / Redis (Lettuce + Redisson) / MySQL 8 / JMeter / Docker Compose / Vue2 + ElementUI（前端）

## License

MIT
