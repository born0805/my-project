package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.entity.Shop;
import com.jumimiao.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 店铺控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {
    
    private final ShopService shopService;
    
    /**
     * 获取所有店铺
     */
    @GetMapping("/list")
    public Result<List<Shop>> list() {
        List<Shop> shops = shopService.list();
        return Result.success(shops);
    }
    
    /**
     * 根据ID获取店铺
     */
    @GetMapping("/{id}")
    public Result<Shop> getById(@PathVariable Long id) {
        Shop shop = shopService.getById(id);
        if (shop != null) {
            return Result.success(shop);
        }
        return Result.error("店铺不存在");
    }
    
    /**
     * 根据店长ID获取店铺
     */
    @GetMapping("/owner/{ownerId}")
    public Result<Shop> getByOwnerId(@PathVariable Long ownerId) {
        Shop shop = shopService.lambdaQuery()
                .eq(Shop::getOwnerId, ownerId)
                .one();
        if (shop != null) {
            return Result.success(shop);
        }
        return Result.error("店铺不存在");
    }
    
    /**
     * 新增店铺
     */
    @PostMapping
    public Result<Shop> save(@RequestBody Shop shop) {
        boolean saved = shopService.save(shop);
        if (saved) {
            return Result.success("新增成功", shop);
        }
        return Result.error("新增失败");
    }
    
    /**
     * 更新店铺
     */
    @PutMapping
    public Result<Shop> update(@RequestBody Shop shop) {
        boolean updated = shopService.updateById(shop);
        if (updated) {
            return Result.success("更新成功", shop);
        }
        return Result.error("更新失败");
    }
    
    /**
     * 删除店铺
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean removed = shopService.removeById(id);
        if (removed) {
            return Result.success("删除成功");
        }
        return Result.error("删除失败");
    }
}






