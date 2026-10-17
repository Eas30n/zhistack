package com.eas30n.zhistack.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.eas30n.zhistack.dto.LoginFormDTO;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.User;

import javax.servlet.http.HttpSession;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface IUserService extends IService<User> {

    /**
     * 发送验证码并保存验证码
     * @param phone 手机号
     * @return 验证码发送结果
     */
    Result sendCode(String phone, HttpSession session);

    /**
     * 登录校验功能
     * @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
     * @return 登录结果
     */
    Result login(LoginFormDTO loginForm, HttpSession session);

    /**
     * 退出登录，销毁当前 token 对应的登录态
     * @param token 请求头 authorization 中携带的登录令牌
     * @return 登出结果
     */
    Result logout(String token);

    Result sign();

    Result signCount();
}
