package com.jumimiao.controller;

import com.jumimiao.common.Result;
import com.jumimiao.entity.OrderItem;
import com.jumimiao.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 订单项控制器
 * 
 * @author jumimiao
 */
@RestController
@RequestMapping("/order-item")
@RequiredArgsConstructor
public class OrderItemController {
    
    private final OrderItemService orderItemService;
    
    /**
     * 根据订单ID获取订单项列表
     */
    @GetMapping("/order/{orderId}")
    public Result<List<OrderItem>> getByOrderId(@PathVariable Long orderId) {
        List<OrderItem> items = orderItemService.lambdaQuery()
                .eq(OrderItem::getOrderId, orderId)
                .list();
        return Result.success(items);
    }
}

