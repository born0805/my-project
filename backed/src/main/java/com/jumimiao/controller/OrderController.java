package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.dto.OrderCreateDTO;
import com.jumimiao.entity.Order;
import com.jumimiao.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 订单控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    /**
     * 根据店铺ID获取订单列表
     */
    @GetMapping("/shop/{shopId}")
    public Result<List<Order>> getByShopId(@PathVariable Long shopId) {
        List<Order> orders = orderService.lambdaQuery()
                .eq(Order::getShopId, shopId)
                .orderByDesc(Order::getCreateTime)
                .list();
        return Result.success(orders);
    }
    
    /**
     * 根据用户ID获取订单列表
     */
    @GetMapping("/user/{userId}")
    public Result<List<Order>> getByUserId(@PathVariable Long userId) {
        List<Order> orders = orderService.lambdaQuery()
                .eq(Order::getUserId, userId)
                .orderByDesc(Order::getCreateTime)
                .list();
        return Result.success(orders);
    }
    
    /**
     * 根据ID获取订单
     */
    @GetMapping("/{id}")
    public Result<Order> getById(@PathVariable Long id) {
        Order order = orderService.getById(id);
        if (order != null) {
            return Result.success(order);
        }
        return Result.error("订单不存在");
    }
    
    /**
     * 创建订单
     */
    @PostMapping
    public Result<Order> create(@RequestBody OrderCreateDTO orderDTO, @RequestParam Long userId) {
        try {
            Order order = orderService.createOrder(orderDTO, userId);
            return Result.success("订单创建成功", order);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
    
    /**
     * 更新订单状态
     */
    @PutMapping("/{id}/status")
    public Result<Order> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderService.getById(id);
        if (order == null) {
            return Result.error("订单不存在");
        }
        order.setStatus(status);
        boolean updated = orderService.updateById(order);
        if (updated) {
            return Result.success("状态更新成功", order);
        }
        return Result.error("状态更新失败");
    }
}






