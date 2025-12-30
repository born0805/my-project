package com.jumimiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jumimiao.dto.OrderCreateDTO;
import com.jumimiao.entity.Order;
import com.jumimiao.entity.OrderItem;
import com.jumimiao.entity.Product;
import com.jumimiao.mapper.OrderMapper;
import com.jumimiao.service.OrderItemService;
import com.jumimiao.service.OrderService;
import com.jumimiao.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 订单服务实现类
 * 
 * @author jumimiao
 */
@Service
@RequiredArgsConstructor
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {
    
    private final ProductService productService;
    private final OrderItemService orderItemService;
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Order createOrder(OrderCreateDTO orderDTO, Long userId) {
        // 创建订单
        Order order = new Order();
        order.setOrderNo("ORD" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setShopId(orderDTO.getShopId());
        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setRemark(orderDTO.getRemark());
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        
        // 计算总金额并创建订单项
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = orderDTO.getItems().stream().map(itemDTO -> {
            Product product = productService.getById(itemDTO.getProductId());
            if (product == null) {
                throw new RuntimeException("产品不存在: " + itemDTO.getProductId());
            }
            if (product.getStock() < itemDTO.getQuantity()) {
                throw new RuntimeException("产品库存不足: " + product.getName());
            }
            
            BigDecimal price = product.getPrice();
            BigDecimal subtotal = price.multiply(BigDecimal.valueOf(itemDTO.getQuantity()));
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(null); // 先设置为null，保存订单后更新
            orderItem.setProductId(product.getId());
            orderItem.setProductName(product.getName());
            orderItem.setPrice(price);
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setSubtotal(subtotal);
            orderItem.setCreateTime(LocalDateTime.now());
            
            return orderItem;
        }).collect(Collectors.toList());
        
        // 计算总金额
        totalAmount = orderItems.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        order.setTotalAmount(totalAmount);
        
        // 保存订单
        save(order);
        
        // 保存订单项并更新库存
        for (OrderItem item : orderItems) {
            item.setOrderId(order.getId());
            orderItemService.save(item);
            
            // 更新产品库存
            Product product = productService.getById(item.getProductId());
            product.setStock(product.getStock() - item.getQuantity());
            productService.updateById(product);
        }
        
        return order;
    }
}






