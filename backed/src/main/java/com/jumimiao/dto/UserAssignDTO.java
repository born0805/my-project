package com.jumimiao.dto;

import lombok.Data;

/**
 * 用户分配DTO
 * 
 * @author jumimiao
 */
@Data
public class UserAssignDTO {
    
    /**
     * 用户ID
     */
    private Long userId;
    
    /**
     * 店铺ID
     */
    private Long shopId;
    
    /**
     * 角色（OWNER或STAFF）
     */
    private String role;
}



