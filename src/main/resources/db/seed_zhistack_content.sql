-- 知栈种子内容（沙龙活动社区叙事）
SET NAMES utf8mb4;

-- 分类：初版消费分类 → 技术社区分类
UPDATE tb_activity_category SET name='后端开发', icon='/types/cat1.png' WHERE id=1;
UPDATE tb_activity_category SET name='算法与数据结构', icon='/types/cat2.png' WHERE id=2;
UPDATE tb_activity_category SET name='职场成长', icon='/types/cat3.png' WHERE id=3;
UPDATE tb_activity_category SET name='源码解读', icon='/types/cat4.png' WHERE id=4;
UPDATE tb_activity_category SET name='面试经验', icon='/types/cat5.png' WHERE id=5;
UPDATE tb_activity_category SET name='架构设计', icon='/types/cat6.png' WHERE id=6;
UPDATE tb_activity_category SET name='读书分享', icon='/types/cat7.png' WHERE id=7;
UPDATE tb_activity_category SET name='开源协作', icon='/types/cat8.png' WHERE id=8;
UPDATE tb_activity_category SET name='线下沙龙', icon='/types/cat9.png' WHERE id=9;
UPDATE tb_activity_category SET name='工具效率', icon='/types/cat10.png' WHERE id=10;

-- 活动：商户 → 线下沙龙
UPDATE tb_activity SET name='Java并发实战沙龙' WHERE id=1;
UPDATE tb_activity SET name='简历门诊·后端专场' WHERE id=2;
UPDATE tb_activity SET name='Spring Boot源码解读局' WHERE id=3;
UPDATE tb_activity SET name='算法周五·滑动窗口专场' WHERE id=4;
UPDATE tb_activity SET name='系统设计工作坊·缓存架构' WHERE id=5;
UPDATE tb_activity SET name='开源协作实践·第一个PR' WHERE id=6;
UPDATE tb_activity SET name='面试经验分享会·MySQL专场' WHERE id=7;
UPDATE tb_activity SET name='读书会·《码农翻身》' WHERE id=8;
UPDATE tb_activity SET name='JVM调优案例局' WHERE id=9;
UPDATE tb_activity SET name='分布式论文读组·Raft' WHERE id=10;
UPDATE tb_activity SET name='前后端协作规范沙龙' WHERE id=11;
UPDATE tb_activity SET name='技术英语角' WHERE id=12;
UPDATE tb_activity SET name='晋升述职模拟会' WHERE id=13;
UPDATE tb_activity SET name='工具效率分享·数字工具箱' WHERE id=14;
UPDATE tb_activity SET images='/imgs/covers/cover1.png,/imgs/covers/cover2.png' WHERE id % 2 = 1;
UPDATE tb_activity SET images='/imgs/covers/cover2.png,/imgs/covers/cover1.png' WHERE id % 2 = 0;

-- 门票：优惠券 → 沙龙免费票
UPDATE tb_ticket SET activity_id=1, title='Java并发实战沙龙·免费体验票', sub_title='限50席 先到先得', rules='报名成功到场签到即可核销', type=2, pay_value=0, actual_value=0 WHERE id=1;
UPDATE tb_ticket SET activity_id=4, title='算法周五刷题夜·免费票', sub_title='限100席 含题目讲义', rules='凭票入场，讲义现场发放', type=2, pay_value=0, actual_value=0 WHERE id=2;
UPDATE tb_ticket SET activity_id=8, title='读书会·纪念门票', sub_title='限30席 含共读书目清单', rules='凭票入场', type=2, pay_value=0, actual_value=0 WHERE id=3;

-- 帖子：探店笔记 → 参会分享/经验帖
UPDATE tb_post SET title='Java并发沙龙听完才懂：线程池参数不是背出来的', content='讲师把核心线程数讲成了"常驻员工+临时工"的故事，配合队列容量一起看才明白拒绝策略为什么是最后一道闸。现场写了个8线程下载小demo，比看十篇文章都管用。' WHERE id=1;
UPDATE tb_post SET title='第一次去简历门诊，被追着问了三层"为什么"', content='老师只改了三个动词，项目经历立刻有了主线。最扎心的一刀：写了Redis却没讲清楚缓存击穿怎么防。回去把项目重讲了一遍才敢投。' WHERE id=2;
UPDATE tb_post SET title='读完《码农翻身》：从浏览器地址栏重新理解HTTP', content='这本书把请求链路拆成小故事，DNS、TCP、HTTP一层层递进，配上读书会现场互相提问，比自学扎实太多。强烈建议组队读。' WHERE id=3;
UPDATE tb_post SET title='面试复盘：MySQL索引被问了30分钟', content='从B+树为什么适合磁盘，问到覆盖索引与最左前缀，最后落在一条慢SQL优化上。这场面和在面试经验分享会互练的几乎一模一样，模拟真的有用。' WHERE id=4;
UPDATE tb_post SET title='源码解读局笔记：自动装配三连', content='@SpringBootApplication拆成三个注解逐个看，EnableAutoConfiguration→AutoConfigurationImportSelector→spring.factories，一条线串起来就没那么玄学了。' WHERE id=5;
UPDATE tb_post SET title='算法组第四周：滑动窗口终于通了', content='从暴力双循环到窗口收缩模板，五个人互相讲了一遍思路，比刷五十道题有效。下周专题是二分查找的边界条件。' WHERE id=6;
UPDATE tb_post SET title='把我的数字工具箱交出来了：IDEA+终端+AI助手', content='效率局上大家晒的工作流各有巧思，最惊喜的是用脚本把沙龙报名、笔记归档全自动串起来的同学。改造完自己的流程，每天省出一小时。' WHERE id=7;
UPDATE tb_post SET title='系统设计工作坊收获：缓存不只是get/set', content='击穿、穿透、雪崩三件套讲完，又加了多级缓存与失效广播的取舍讨论。原来"缓存一致性"背后是一连串业务权衡。' WHERE id=8;
UPDATE tb_post SET title='组织一场线下沙龙的复盘：运营比写代码难', content='报名、签到、物料、议程时间控制，每个环节都有坑。但看到大家散场还在围着白板讨论，值了。下期把时间控制做成倒计时。' WHERE id=9;
UPDATE tb_post SET title='开源第一课：从怯生生提PR到被maintainer点赞', content='协作实践局带着走完fork、分支、commit规范、PR描述全流程。原来一个好的PR描述，比代码改得漂亮更重要。' WHERE id=10;
UPDATE tb_post SET title='读书会第二场：技术书要这样读', content='先读目录建地图，再精读正文做卡片，最后合上书讲给别人听。费曼学习法在小组里落地，效果拔群。' WHERE id=11;
UPDATE tb_post SET title='JVM案例局笔记：GC日志原来是这么读的', content='带着自己的日志现场逐行分析，GC原因、停顿时间、晋升失败一次讲透。回去就把线上服务的监控面板补上了。' WHERE id=12;
UPDATE tb_post SET title='晋升模拟会反馈：你的PPT不是简历', content='评委一句话点醒：述职要有主线故事，不是罗列做过什么。把"我做了什么"改成"我解决了什么问题、带来了什么变化"，气质完全不同。' WHERE id=13;
UPDATE tb_post SET title='技术英语角：读论文是可以练的技能', content='从摘要开始逐句拆解长难句，配上专业词表，两场下来我已经能独立读完一篇MySQL论文的引言部分。第一手信息的世界打开了。' WHERE id=14;
UPDATE tb_post SET title='分布式论文读组：Raft 过完第一遍', content='Leader选举、日志复制、安全性三章对着动画一起推，现场画状态图。比看视频直观，下周开始讨论工程实现里的坑。' WHERE id=15;
UPDATE tb_post SET title='沙龙听完分享会心得：项目亮点要这样讲', content='STAR法则听过无数次，现场看到别人把一次缓存改造讲成完整故事才明白差距在细节：数字、取舍、复盘，一个都不能少。' WHERE id=16;
UPDATE tb_post SET title='前后端协作沙龙小记：接口文档即契约', content='错误码规范、字段命名、Mock与联调节奏，一场会聊透了协作的边界。回去就给团队整理了一份接口规范模板。' WHERE id=17;
UPDATE tb_post SET title='周末两小时：写了个CLI工具管理沙龙报名', content='把签到名单、候补队列、提醒消息串成一条命令，工具效率局的灵感直接落地。下次活动就用它了。' WHERE id=18;
UPDATE tb_post SET title='沙龙前的Redis突击：从背八股到真动手', content='为了在沙龙上听懂，突击了持久化、哨兵与Stream。到现场才发现，消息消费组的pending列表才是最好玩的部分。' WHERE id=19;
UPDATE tb_post SET title='写技术博客一年，我是怎么积累个人品牌的', content='选题来自日常踩坑，发布节奏比数量重要，评论区是最好的第二课堂。一年下来，面试时被问到博客的场次比简历还多。' WHERE id=20;
UPDATE tb_post SET images='/imgs/covers/cover1.png' WHERE id % 2 = 1;
UPDATE tb_post SET images='/imgs/covers/cover2.png' WHERE id % 2 = 0;
