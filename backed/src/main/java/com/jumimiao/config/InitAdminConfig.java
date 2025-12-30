package com.jumimiao.config;

import com.jumimiao.entity.User;
import com.jumimiao.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * 初始化管理员账号配置
 * 
 * @author jumimiao
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class InitAdminConfig implements CommandLineRunner {
    
    private final UserService userService;
    
    @Override
    public void run(String... args) {
        // 检查是否存在管理员账号
        User admin = userService.lambdaQuery()
                .eq(User::getUsername, "admin")
                .one();
        
        if (admin == null) {
            // 创建默认管理员账号
            User defaultAdmin = new User();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("admin"); // 实际项目中应该加密存储
            defaultAdmin.setNickname("系统管理员");
            defaultAdmin.setRole("ADMIN");
            defaultAdmin.setCreateTime(LocalDateTime.now());
            defaultAdmin.setUpdateTime(LocalDateTime.now());
            
            userService.save(defaultAdmin);
            log.info("默认管理员账号创建成功: admin/admin");
        } else {
            log.info("管理员账号已存在: admin");
        }
    }
}



