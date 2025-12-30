package com.jumimiao.dto;

import lombok.Data;
import java.util.List;

/**
 * 创建订单DTO
 * 
 * @author jumimiao
 */
@Data
public class OrderCreateDTO {
    
    /**
     * 店铺ID
     */
    private Long shopId;
    
    /**
     * 订单项列表
     */
    private List<OrderItemDTO> items;
    
    /**
     * 备注
     */
    private String remark;
    
    @Data
    public static class OrderItemDTO {
        /**
         * 产品ID
         */
        private Long productId;
        
        /**
         * 数量
         */
        private Integer quantity;
    }
}






