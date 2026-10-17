package com.eas30n.zhistack.service.impl;

import com.eas30n.zhistack.entity.UserProfile;
import com.eas30n.zhistack.mapper.UserProfileMapper;
import com.eas30n.zhistack.service.IUserProfileService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-24
 */
@Service
public class UserProfileServiceImpl extends ServiceImpl<UserProfileMapper, UserProfile> implements IUserProfileService {

}
