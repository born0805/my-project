package com.jumimiao;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 聚米喵项目启动类
 * 
 * @author jumimiao
 */
@SpringBootApplication
@MapperScan("com.jumimiao.mapper")
public class JumimiaoApplication {

    public static void main(String[] args) {
        SpringApplication.run(JumimiaoApplication.class, args);
    }
}






