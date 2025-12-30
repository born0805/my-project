package com.jumimiao.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jumimiao.entity.Order;
import com.jumimiao.dto.OrderCreateDTO;

/**
 * 订单服务接口
 * 
 * @author jumimiao
 */
public interface OrderService extends IService<Order> {
    
    /**
     * 创建订单
     */
    Order createOrder(OrderCreateDTO orderDTO, Long userId);
}






