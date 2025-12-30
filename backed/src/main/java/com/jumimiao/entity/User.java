package com.jumimiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 用户实体类
 * 
 * @author jumimiao
 */
@Data
@TableName("user")
public class User {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String username;
    
    private String password;
    
    private String email;
    
    private String nickname;
    
    /**
     * 所属店铺ID
     */
    private Long shopId;
    
    /**
     * 角色：ADMIN-管理员, OWNER-店主, STAFF-店员
     */
    private String role;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}

