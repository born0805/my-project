package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.dto.UserAssignDTO;
import com.jumimiao.entity.Shop;
import com.jumimiao.entity.User;
import com.jumimiao.service.ShopService;
import com.jumimiao.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 管理员控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    
    private final ShopService shopService;
    private final UserService userService;
    
    // ========== 店铺管理 ==========
    
    /**
     * 获取所有店铺（管理员）
     */
    @GetMapping("/shops")
    public Result<List<Shop>> getAllShops() {
        List<Shop> shops = shopService.list();
        return Result.success(shops);
    }
    
    /**
     * 创建店铺（管理员）
     */
    @PostMapping("/shops")
    public Result<Shop> createShop(@RequestBody Shop shop) {
        // 验证店长是否存在
        User owner = userService.getById(shop.getOwnerId());
        if (owner == null) {
            return Result.error("店长不存在");
        }
        if (!"OWNER".equals(owner.getRole())) {
            return Result.error("该用户不是店长角色");
        }
        
        shop.setCreateTime(LocalDateTime.now());
        shop.setUpdateTime(LocalDateTime.now());
        boolean saved = shopService.save(shop);
        if (saved) {
            return Result.success("店铺创建成功", shop);
        }
        return Result.error("店铺创建失败");
    }
    
    /**
     * 更新店铺（管理员）
     */
    @PutMapping("/shops")
    public Result<Shop> updateShop(@RequestBody Shop shop) {
        shop.setUpdateTime(LocalDateTime.now());
        boolean updated = shopService.updateById(shop);
        if (updated) {
            return Result.success("店铺更新成功", shop);
        }
        return Result.error("店铺更新失败");
    }
    
    /**
     * 删除店铺（管理员）
     */
    @DeleteMapping("/shops/{id}")
    public Result<Void> deleteShop(@PathVariable Long id) {
        boolean removed = shopService.removeById(id);
        if (removed) {
            return Result.success("店铺删除成功");
        }
        return Result.error("店铺删除失败");
    }
    
    // ========== 用户管理 ==========
    
    /**
     * 获取所有用户（管理员）
     */
    @GetMapping("/users")
    public Result<List<User>> getAllUsers() {
        List<User> users = userService.list();
        // 不返回密码
        users.forEach(user -> user.setPassword(null));
        return Result.success(users);
    }
    
    /**
     * 创建用户（管理员）
     */
    @PostMapping("/users")
    public Result<User> createUser(@RequestBody User user) {
        // 检查用户名是否已存在
        User existing = userService.lambdaQuery()
                .eq(User::getUsername, user.getUsername())
                .one();
        if (existing != null) {
            return Result.error("用户名已存在");
        }
        
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        boolean saved = userService.save(user);
        if (saved) {
            user.setPassword(null); // 不返回密码
            return Result.success("用户创建成功", user);
        }
        return Result.error("用户创建失败");
    }
    
    /**
     * 更新用户（管理员）
     */
    @PutMapping("/users")
    public Result<User> updateUser(@RequestBody User user) {
        user.setUpdateTime(LocalDateTime.now());
        boolean updated = userService.updateById(user);
        if (updated) {
            user.setPassword(null); // 不返回密码
            return Result.success("用户更新成功", user);
        }
        return Result.error("用户更新失败");
    }
    
    /**
     * 删除用户（管理员）
     */
    @DeleteMapping("/users/{id}")
    public Result<Void> deleteUser(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null && "ADMIN".equals(user.getRole())) {
            return Result.error("不能删除管理员账号");
        }
        boolean removed = userService.removeById(id);
        if (removed) {
            return Result.success("用户删除成功");
        }
        return Result.error("用户删除失败");
    }
    
    /**
     * 将用户分配到店铺（管理员）
     */
    @PostMapping("/users/assign")
    public Result<User> assignUserToShop(@RequestBody UserAssignDTO assignDTO) {
        User user = userService.getById(assignDTO.getUserId());
        if (user == null) {
            return Result.error("用户不存在");
        }
        
        if (assignDTO.getShopId() != null) {
            Shop shop = shopService.getById(assignDTO.getShopId());
            if (shop == null) {
                return Result.error("店铺不存在");
            }
        }
        
        user.setShopId(assignDTO.getShopId());
        if (assignDTO.getRole() != null) {
            user.setRole(assignDTO.getRole());
        }
        user.setUpdateTime(LocalDateTime.now());
        
        boolean updated = userService.updateById(user);
        if (updated) {
            user.setPassword(null);
            return Result.success("用户分配成功", user);
        }
        return Result.error("用户分配失败");
    }
}



