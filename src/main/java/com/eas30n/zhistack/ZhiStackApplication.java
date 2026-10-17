package com.eas30n.zhistack;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy(exposeProxy = true) // 暴露代理对象
@MapperScan("com.eas30n.zhistack.mapper")
@SpringBootApplication
public class ZhiStackApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZhiStackApplication.class, args);
    }

}
