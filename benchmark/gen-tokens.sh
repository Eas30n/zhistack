#!/bin/bash
# 生成压测用户与 token：注册 1000 个测试账号（139 号段），登录取 token 写入 tokens.csv
OUT="D:/code/java/HMDP/ZhiStack/benchmark/tokens.csv"
> "$OUT"
sleep 12
for i in $(seq 1 1000); do
  phone=$(printf "1390000%04d" $i)
  curl -s -X POST "http://localhost:8081/user/code?phone=$phone" > /dev/null
  code=$(docker exec xunzhi-redis redis-cli get "login:code:$phone")
  token=$(curl -s -X POST "http://localhost:8081/user/login" -H "Content-Type: application/json" \
    -d "{\"phone\":\"$phone\",\"password\":\"123456\",\"code\":\"$code\"}" \
    | sed -E 's/.*"data":"([^"]*)".*/\1/')
  [ -n "$token" ] && [ "$token" != "$code" ] && echo "$token" >> "$OUT"
  [ $((i % 100)) -eq 0 ] && echo "progress: $i"
done
echo "tokens: $(wc -l < $OUT)"
