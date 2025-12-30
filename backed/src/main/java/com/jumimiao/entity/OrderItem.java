package com.jumimiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单项实体类
 * 
 * @author jumimiao
 */
@Data
@TableName("order_item")
public class OrderItem {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 订单ID
     */
    private Long orderId;
    
    /**
     * 产品ID
     */
    private Long productId;
    
    /**
     * 产品名称（快照）
     */
    private String productName;
    
    /**
     * 单价（快照）
     */
    private BigDecimal price;
    
    /**
     * 数量
     */
    private Integer quantity;
    
    /**
     * 小计金额
     */
    private BigDecimal subtotal;
    
    private LocalDateTime createTime;
}






