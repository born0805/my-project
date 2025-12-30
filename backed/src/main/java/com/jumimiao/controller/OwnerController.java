package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.entity.Shop;
import com.jumimiao.entity.User;
import com.jumimiao.service.ShopService;
import com.jumimiao.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 店长控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/owner")
@RequiredArgsConstructor
public class OwnerController {
    
    private final ShopService shopService;
    private final UserService userService;
    
    /**
     * 获取我的店铺信息
     */
    @GetMapping("/shop")
    public Result<Shop> getMyShop(@RequestParam Long ownerId) {
        Shop shop = shopService.lambdaQuery()
                .eq(Shop::getOwnerId, ownerId)
                .one();
        if (shop != null) {
            return Result.success(shop);
        }
        return Result.error("店铺不存在");
    }
    
    /**
     * 更新我的店铺信息
     */
    @PutMapping("/shop")
    public Result<Shop> updateMyShop(@RequestBody Shop shop, @RequestParam Long ownerId) {
        Shop existingShop = shopService.lambdaQuery()
                .eq(Shop::getOwnerId, ownerId)
                .one();
        if (existingShop == null) {
            return Result.error("店铺不存在");
        }
        
        // 只能更新店铺名称、描述、地址、电话
        existingShop.setName(shop.getName());
        existingShop.setDescription(shop.getDescription());
        existingShop.setAddress(shop.getAddress());
        existingShop.setPhone(shop.getPhone());
        existingShop.setUpdateTime(LocalDateTime.now());
        
        boolean updated = shopService.updateById(existingShop);
        if (updated) {
            return Result.success("店铺更新成功", existingShop);
        }
        return Result.error("店铺更新失败");
    }
    
    /**
     * 获取我店铺的所有员工
     */
    @GetMapping("/shop/staff")
    public Result<List<User>> getShopStaff(@RequestParam Long shopId) {
        List<User> staff = userService.lambdaQuery()
                .eq(User::getShopId, shopId)
                .in(User::getRole, "OWNER", "STAFF")
                .list();
        // 不返回密码
        staff.forEach(user -> user.setPassword(null));
        return Result.success(staff);
    }
    
    /**
     * 新增店员（店长）
     */
    @PostMapping("/shop/staff")
    public Result<User> addStaff(@RequestBody User staff, @RequestParam Long shopId) {
        // 验证店铺是否存在
        Shop shop = shopService.getById(shopId);
        if (shop == null) {
            return Result.error("店铺不存在");
        }
        
        // 检查用户名是否已存在
        User existing = userService.lambdaQuery()
                .eq(User::getUsername, staff.getUsername())
                .one();
        if (existing != null) {
            return Result.error("用户名已存在");
        }
        
        // 设置为店员
        staff.setShopId(shopId);
        staff.setRole("STAFF");
        staff.setCreateTime(LocalDateTime.now());
        staff.setUpdateTime(LocalDateTime.now());
        
        boolean saved = userService.save(staff);
        if (saved) {
            staff.setPassword(null); // 不返回密码
            return Result.success("店员添加成功", staff);
        }
        return Result.error("店员添加失败");
    }
    
    /**
     * 更新店员信息（店长）
     */
    @PutMapping("/shop/staff")
    public Result<User> updateStaff(@RequestBody User staff, @RequestParam Long shopId) {
        // 验证店员是否属于该店铺
        User existingStaff = userService.getById(staff.getId());
        if (existingStaff == null) {
            return Result.error("店员不存在");
        }
        if (!shopId.equals(existingStaff.getShopId())) {
            return Result.error("该店员不属于此店铺");
        }
        if (!"STAFF".equals(existingStaff.getRole())) {
            return Result.error("该用户不是店员");
        }
        
        // 更新信息（不能修改角色和店铺）
        existingStaff.setUsername(staff.getUsername());
        if (staff.getPassword() != null && !staff.getPassword().isEmpty()) {
            existingStaff.setPassword(staff.getPassword());
        }
        existingStaff.setEmail(staff.getEmail());
        existingStaff.setNickname(staff.getNickname());
        existingStaff.setUpdateTime(LocalDateTime.now());
        
        boolean updated = userService.updateById(existingStaff);
        if (updated) {
            existingStaff.setPassword(null);
            return Result.success("店员更新成功", existingStaff);
        }
        return Result.error("店员更新失败");
    }
    
    /**
     * 删除店员（店长）
     */
    @DeleteMapping("/shop/staff/{staffId}")
    public Result<Void> deleteStaff(@PathVariable Long staffId, @RequestParam Long shopId) {
        User staff = userService.getById(staffId);
        if (staff == null) {
            return Result.error("店员不存在");
        }
        if (!shopId.equals(staff.getShopId())) {
            return Result.error("该店员不属于此店铺");
        }
        if (!"STAFF".equals(staff.getRole())) {
            return Result.error("该用户不是店员");
        }
        
        boolean removed = userService.removeById(staffId);
        if (removed) {
            return Result.success("店员删除成功");
        }
        return Result.error("店员删除失败");
    }
}



