package com.jumimiao.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jumimiao.entity.OrderItem;
import com.jumimiao.mapper.OrderItemMapper;
import com.jumimiao.service.OrderItemService;
import org.springframework.stereotype.Service;

/**
 * 订单项服务实现类
 * 
 * @author jumimiao
 */
@Service
public class OrderItemServiceImpl extends ServiceImpl<OrderItemMapper, OrderItem> implements OrderItemService {
}






