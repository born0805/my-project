package com.jumimiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单实体类
 * 
 * @author jumimiao
 */
@Data
@TableName("order")
public class Order {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 订单号
     */
    private String orderNo;
    
    /**
     * 所属店铺ID
     */
    private Long shopId;
    
    /**
     * 下单用户ID（店员）
     */
    private Long userId;
    
    /**
     * 订单总金额
     */
    private BigDecimal totalAmount;
    
    /**
     * 订单状态：PENDING-待处理, PROCESSING-处理中, COMPLETED-已完成, CANCELLED-已取消
     */
    private String status;
    
    /**
     * 备注
     */
    private String remark;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}






