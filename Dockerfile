# 基础镜像可通过 BASE_REGISTRY 切换到国内加速地址，例如：
#   docker compose build --build-arg BASE_REGISTRY=docker.m.daocloud.io/
ARG BASE_REGISTRY=

FROM ${BASE_REGISTRY}maven:3.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY deploy/maven-settings.xml /root/.m2/settings.xml
COPY pom.xml .
COPY src ./src
RUN mvn -B -q clean package -DskipTests

FROM ${BASE_REGISTRY}eclipse-temurin:17-jre
WORKDIR /app
ENV TZ=Asia/Shanghai \
    JAVA_OPTS="-Xms256m -Xmx512m"
COPY --from=build /build/target/zhistack-*.jar app.jar
RUN mkdir -p /app/demo-frontend/imgs
EXPOSE 8081
# MyBatis-Plus 3.4.x 在 JDK17 下需要开放 java.lang.invoke 反射
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS --add-opens java.base/java.lang.invoke=ALL-UNNAMED -jar /app/app.jar"]
