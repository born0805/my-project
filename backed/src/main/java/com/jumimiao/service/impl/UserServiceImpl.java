package com.jumimiao.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jumimiao.entity.User;
import com.jumimiao.mapper.UserMapper;
import com.jumimiao.service.UserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 * 
 * @author jumimiao
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}






