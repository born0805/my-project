package com.jumimiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 店铺实体类
 * 
 * @author jumimiao
 */
@Data
@TableName("shop")
public class Shop {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 店铺名称
     */
    private String name;
    
    /**
     * 店铺描述
     */
    private String description;
    
    /**
     * 店长ID
     */
    private Long ownerId;
    
    /**
     * 店铺地址
     */
    private String address;
    
    /**
     * 联系电话
     */
    private String phone;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}






