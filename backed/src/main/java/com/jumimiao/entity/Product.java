package com.jumimiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 产品实体类
 * 
 * @author jumimiao
 */
@Data
@TableName("product")
public class Product {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 所属店铺ID
     */
    private Long shopId;
    
    /**
     * 产品名称
     */
    private String name;
    
    /**
     * 产品描述
     */
    private String description;
    
    /**
     * 价格
     */
    private BigDecimal price;
    
    /**
     * 库存数量
     */
    private Integer stock;
    
    /**
     * 产品图片URL
     */
    private String imageUrl;
    
    /**
     * 产品状态：ACTIVE-上架, INACTIVE-下架
     */
    private String status;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}






