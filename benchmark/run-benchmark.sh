#!/bin/bash
# 知栈秒杀压测执行脚本：对照组 A（无防护裸奔版） vs 对照组 C（Lua + Stream 异步版）
# 用法: bash run-benchmark.sh A|C
set -e
BM="D:/code/java/HMDP/ZhiStack/benchmark"
JM="D:/tools/apache-jmeter-5.6.3/bin/jmeter"
MYSQL="D:/develop/mysql-8.0.34-winx64/bin/mysql.exe"
GROUP="$1"
STOCK=137
TICKET=10
export JAVA_HOME="C:/Users/colorful/.jdks/ms-17.0.18"

# ---- 重置环境 ----
$MYSQL -h127.0.0.1 -uroot -p123456 zhistack -e "delete from tb_ticket_order where ticket_id=$TICKET and user_id>1010; update tb_seckill_ticket set stock=$STOCK where ticket_id=$TICKET;" 2>/dev/null
docker exec xunzhi-redis redis-cli del "seckill:stock:$TICKET" "seckill:order:$TICKET" stream.orders > /dev/null
# 重启后端：恢复 Stream 消费者组（@PostConstruct 创建，删 stream 后需重建）
taskkill //F //IM java.exe > /dev/null 2>&1 || true
sleep 2
cd "D:/code/java/HMDP/ZhiStack"
rm -f target/zhistack.log
nohup "C:/Users/colorful/.jdks/ms-17.0.18/bin/java" --add-opens java.base/java.lang.invoke=ALL-UNNAMED -Xmx512m -jar target/zhistack-0.0.1-SNAPSHOT.jar > target/zhistack.log 2>&1 &
for i in $(seq 1 30); do sleep 2; if grep -qa "Started ZhiStackApplication" target/zhistack.log 2>/dev/null; then break; fi; done
cd "$BM"

if [ "$GROUP" = "C" ]; then
  EP="/ticket-order/seckill/$TICKET"
  docker exec xunzhi-redis redis-cli set "seckill:stock:$TICKET" $STOCK > /dev/null
else
  EP="/benchmark/seckill-no-guard/$TICKET"
fi

# ---- 压测 ----
OUT="$BM/results/$GROUP"
rm -rf "$OUT"
mkdir -p "$OUT"
MSYS2_ARG_CONV_EXCL="-J" "$JM" -n -t "$BM/seckill-1000.jmx" -Jendpoint="$EP" -Jtokens="$BM/tokens.csv" -l "$OUT/run.jtl" -e -o "$OUT/report" > "$OUT/jmeter.log" 2>&1

# ---- 等待异步落库（仅 C 组需要）----
if [ "$GROUP" = "C" ]; then sleep 8; fi

# ---- 统计 ----
TOTAL=$(tail -n +2 "$OUT/run.jtl" | wc -l)
SUCC=$(tail -n +2 "$OUT/run.jtl" | awk -F, '$8=="true" && $4=="200"' | wc -l)
DBORDERS=$($MYSQL -h127.0.0.1 -uroot -p123456 zhistack -N -e "select count(*) from tb_ticket_order where ticket_id=$TICKET and user_id>1010;" 2>/dev/null)
DUP=$($MYSQL -h127.0.0.1 -uroot -p123456 zhistack -N -e "select ifnull(sum(c-1),0) from (select count(*) c from tb_ticket_order where ticket_id=$TICKET and user_id>1010 group by user_id having c>1) t;" 2>/dev/null)
DBSTOCK=$($MYSQL -h127.0.0.1 -uroot -p123456 zhistack -N -e "select stock from tb_seckill_ticket where ticket_id=$TICKET;" 2>/dev/null)
echo "group=$GROUP endpoint=$EP requests=$TOTAL success=$SUCC db_orders=$DBORDERS duplicate_orders=$DUP db_stock_left=$DBSTOCK" | tee "$OUT/summary.txt"
