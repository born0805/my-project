-- 聚米喵项目数据库表结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS jumimiao DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE jumimiao;

-- 用户表
CREATE TABLE IF NOT EXISTS `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `username` VARCHAR(50) NOT NULL COMMENT '用户名',
    `password` VARCHAR(255) NOT NULL COMMENT '密码',
    `email` VARCHAR(100) COMMENT '邮箱',
    `nickname` VARCHAR(50) COMMENT '昵称',
    `shop_id` BIGINT COMMENT '所属店铺ID',
    `role` VARCHAR(20) COMMENT '角色：ADMIN-管理员, OWNER-店主, STAFF-店员',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_username` (`username`),
    KEY `idx_shop_id` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 店铺表
CREATE TABLE IF NOT EXISTS `shop` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `name` VARCHAR(100) NOT NULL COMMENT '店铺名称',
    `description` TEXT COMMENT '店铺描述',
    `owner_id` BIGINT NOT NULL COMMENT '店长ID',
    `address` VARCHAR(255) COMMENT '店铺地址',
    `phone` VARCHAR(20) COMMENT '联系电话',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_owner_id` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='店铺表';

-- 产品表
CREATE TABLE IF NOT EXISTS `product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `shop_id` BIGINT NOT NULL COMMENT '所属店铺ID',
    `name` VARCHAR(100) NOT NULL COMMENT '产品名称',
    `description` TEXT COMMENT '产品描述',
    `price` DECIMAL(10, 2) NOT NULL COMMENT '价格',
    `stock` INT DEFAULT 0 COMMENT '库存数量',
    `image_url` VARCHAR(255) COMMENT '产品图片URL',
    `status` VARCHAR(20) DEFAULT 'ACTIVE' COMMENT '产品状态：ACTIVE-上架, INACTIVE-下架',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_shop_id` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表';

-- 订单表
CREATE TABLE IF NOT EXISTS `order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `order_no` VARCHAR(50) NOT NULL COMMENT '订单号',
    `shop_id` BIGINT NOT NULL COMMENT '所属店铺ID',
    `user_id` BIGINT NOT NULL COMMENT '下单用户ID（店员）',
    `total_amount` DECIMAL(10, 2) NOT NULL COMMENT '订单总金额',
    `status` VARCHAR(20) DEFAULT 'PENDING' COMMENT '订单状态：PENDING-待处理, PROCESSING-处理中, COMPLETED-已完成, CANCELLED-已取消',
    `remark` VARCHAR(500) COMMENT '备注',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_order_no` (`order_no`),
    KEY `idx_shop_id` (`shop_id`),
    KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 订单项表
CREATE TABLE IF NOT EXISTS `order_item` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `order_id` BIGINT NOT NULL COMMENT '订单ID',
    `product_id` BIGINT NOT NULL COMMENT '产品ID',
    `product_name` VARCHAR(100) NOT NULL COMMENT '产品名称（快照）',
    `price` DECIMAL(10, 2) NOT NULL COMMENT '单价（快照）',
    `quantity` INT NOT NULL COMMENT '数量',
    `subtotal` DECIMAL(10, 2) NOT NULL COMMENT '小计金额',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `idx_order_id` (`order_id`),
    KEY `idx_product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单项表';

-- 插入默认管理员账号（密码：admin，实际使用时应该加密存储）
INSERT INTO `user` (`username`, `password`, `nickname`, `role`, `create_time`, `update_time`) 
VALUES ('admin', 'admin', '系统管理员', 'ADMIN', NOW(), NOW())
ON DUPLICATE KEY UPDATE `username` = `username`;

