package com.jumimiao.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jumimiao.entity.Product;
import com.jumimiao.mapper.ProductMapper;
import com.jumimiao.service.ProductService;
import org.springframework.stereotype.Service;

/**
 * 产品服务实现类
 * 
 * @author jumimiao
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}






