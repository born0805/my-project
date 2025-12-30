package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.dto.LoginDTO;
import com.jumimiao.entity.User;
import com.jumimiao.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 认证控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    
    /**
     * 登录
     */
    @PostMapping("/login")
    public Result<User> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.lambdaQuery()
                .eq(User::getUsername, loginDTO.getUsername())
                .eq(User::getPassword, loginDTO.getPassword())
                .one();
        
        if (user != null) {
            user.setPassword(null); // 不返回密码
            return Result.success("登录成功", user);
        }
        return Result.error("用户名或密码错误");
    }
    
    /**
     * 获取当前用户信息
     */
    @GetMapping("/user/{id}")
    public Result<User> getUserInfo(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            user.setPassword(null); // 不返回密码
            return Result.success(user);
        }
        return Result.error("用户不存在");
    }
}



