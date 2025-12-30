package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.entity.Product;
import com.jumimiao.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 产品控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;
    
    /**
     * 根据店铺ID获取产品列表
     */
    @GetMapping("/shop/{shopId}")
    public Result<List<Product>> getByShopId(@PathVariable Long shopId) {
        List<Product> products = productService.lambdaQuery()
                .eq(Product::getShopId, shopId)
                .list();
        return Result.success(products);
    }
    
    /**
     * 根据ID获取产品
     */
    @GetMapping("/{id}")
    public Result<Product> getById(@PathVariable Long id) {
        Product product = productService.getById(id);
        if (product != null) {
            return Result.success(product);
        }
        return Result.error("产品不存在");
    }
    
    /**
     * 新增产品
     */
    @PostMapping
    public Result<Product> save(@RequestBody Product product) {
        boolean saved = productService.save(product);
        if (saved) {
            return Result.success("新增成功", product);
        }
        return Result.error("新增失败");
    }
    
    /**
     * 更新产品
     */
    @PutMapping
    public Result<Product> update(@RequestBody Product product) {
        boolean updated = productService.updateById(product);
        if (updated) {
            return Result.success("更新成功", product);
        }
        return Result.error("更新失败");
    }
    
    /**
     * 删除产品
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        boolean removed = productService.removeById(id);
        if (removed) {
            return Result.success("删除成功");
        }
        return Result.error("删除失败");
    }
}






