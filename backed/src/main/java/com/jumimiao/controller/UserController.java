package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.entity.User;
import com.jumimiao.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 用户控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    /**
     * 获取所有用户
     */
    @GetMapping("/list")
    public Result<List<User>> list() {
        List<User> users = userService.list();
        return Result.success(users);
    }
    
    /**
     * 根据ID获取用户
     */
    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            return Result.success(user);
        }
        return Result.error("用户不存在");
    }
    
    /**
     * 根据店铺ID获取用户列表
     */
    @GetMapping("/shop/{shopId}")
    public Result<List<User>> getByShopId(@PathVariable Long shopId) {
        List<User> users = userService.lambdaQuery()
                .eq(User::getShopId, shopId)
                .list();
        return Result.success(users);
    }
    
    /**
     * 新增用户
     */
    @PostMapping
    public Result<User> save(@RequestBody User user) {
        boolean saved = userService.save(user);
        if (saved) {
            return Result.success("新增成功", user);
        }
        return Result.error("新增失败");
    }
    
    /**
     * 更新用户
     */
    @PutMapping
    public Result<User> update(@RequestBody User user) {
        boolean updated = userService.updateById(user);
        if (updated) {
            return Result.success("更新成功", user);
        }
        return Result.error("更新失败");
    }
    
    /**
     * 删除用户
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean removed = userService.removeById(id);
        if (removed) {
            return Result.success("删除成功");
        }
        return Result.error("删除失败");
    }
}

