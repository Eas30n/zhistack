package com.eas30n.zhistack.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import cn.hutool.core.lang.UUID;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eas30n.zhistack.dto.LoginFormDTO;
import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.dto.UserDTO;
import com.eas30n.zhistack.entity.User;
import com.eas30n.zhistack.mapper.UserMapper;
import com.eas30n.zhistack.service.IUserService;
import com.eas30n.zhistack.utils.RegexUtils;
import com.eas30n.zhistack.utils.SystemConstants;
import com.eas30n.zhistack.utils.UserHolder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.BitFieldSubCommands;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static com.eas30n.zhistack.utils.RedisConstants.*;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 发送验证码并保存验证码
     * @param phone
     * @param session
     * @return
     */
    public Result sendCode(String phone, HttpSession session) {
        //1.校验手机号
        if (RegexUtils.isPhoneInvalid(phone)) {     //用到正则表达式工具类
            //2.不符合，返回错误
            return Result.fail("手机号格式错误");
        }

        //3.符合，生成验证码
        String code = RandomUtil.randomNumbers(6);

        //4.保存验证码到 reids            //set key value ex 120s
        stringRedisTemplate.opsForValue().set(LOGIN_CODE_KEY + phone,code,LOGIN_CODE_TTL, TimeUnit.MINUTES);

        //5.发送验证码
        log.debug("发送短信验证码成功，验证码：{}", code);

        //6.返回结果
        return Result.ok();
    }

    /**
     * 登录校验功能
     * @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
     * @param session
     * @return
     */
    public Result login(LoginFormDTO loginForm, HttpSession session) {
        //1.校验手机号
        String phone = loginForm.getPhone();
        if (RegexUtils.isPhoneInvalid(loginForm.getPhone())) {
            //2.如果不符合，返回错误
            return Result.fail("手机号格式错误");
        }

        // 3.从redis获取并校验验证码
        String cacheCode = stringRedisTemplate.opsForValue().get(LOGIN_CODE_KEY + phone);
        String code = loginForm.getCode();      //从表单中获取验证码
        if (cacheCode == null || !cacheCode.equals(code)) {
            //不一致，返回错误
            return Result.fail("验证码错误");
        }

        //4.一致，根据手机号查询用户    select * from tb_user where phone = ?
        User user = query().eq("phone", phone).one();// 用mybatisplus的查询方法

        //5.判断用户是否存在
        if (user == null) {
            //6.不存在，创建新用户并保存
            user = createUserWithPhone(phone);
        }

        //7.保存用户信息到 redis
        //7.1.随机生成token，作为登录令牌
        String token = UUID.randomUUID().toString(true);

        //7.2.将User对象转为HashMap存储
        UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
        Map<String, Object> userMap = BeanUtil.beanToMap(userDTO,new HashMap<>(),
                CopyOptions.create()
                .setIgnoreNullValue( true)
                .setFieldValueEditor( (fieldName,fieldValue)->fieldValue.toString()));
        //7.3.存储
        String tokenKey = LOGIN_USER_KEY + token;
        stringRedisTemplate.opsForHash().putAll( tokenKey,userMap);
        //7.4.设置token有效期
        stringRedisTemplate.expire(tokenKey,LOGIN_USER_TTL,TimeUnit.MINUTES);


        //8.返回token
        return Result.ok(token);
    }

    @Override
    public Result logout(String token) {
        //1.没有 token，视为未登录，直接返回成功
        if (StrUtil.isBlank(token)) {
            return Result.ok();
        }
        //2.删除 redis 中该 token 对应的登录用户信息，令牌立即失效
        stringRedisTemplate.delete(LOGIN_USER_KEY + token);
        //3.清理当前线程的登录态（拦截器的 afterCompletion 也会兜底清理）
        UserHolder.removeUser();
        return Result.ok();
    }

    @Override
    public Result sign() {
        //1.获取当前登录用户
        Long userId = UserHolder.getUser().getId();

        //2. 获取日期
        LocalDateTime now = LocalDateTime.now();

        //3. 拼接key
        String keySuffix = now.format(DateTimeFormatter.ofPattern("yyyyMM"));
        String key = USER_SIGN_KEY + userId + keySuffix;

        //4. 获取今天是本月第几天
        int dayOfMonth = now.getDayOfMonth();

        //5. 写入redis SETBIT key offset 1
        stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
        return Result.ok();
    }

    @Override
    public Result signCount() {
        //1.获取当前登录用户
        Long userId = UserHolder.getUser().getId();

        //2. 获取日期
        LocalDateTime now = LocalDateTime.now();

        //3. 拼接key
        String keySuffix = now.format(DateTimeFormatter.ofPattern("yyyyMM"));
        String key = USER_SIGN_KEY + userId + keySuffix;

        //4. 获取今天是本月第几天
        int dayOfMonth = now.getDayOfMonth();

        //5. 获取本月截止今天为止的所有签到记录,返回的是一个十进制的数字
        List<Long> result = stringRedisTemplate.opsForValue().bitField(
                key,
                BitFieldSubCommands.create()
                        .get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt(0)
        );
        if (result == null || result.isEmpty()) {
            // 没有任何签到记录
            return Result.ok(0);
        }
        Long num = result.get(0);
        if (num == null) {
            return Result.ok(0);
        }

        //6. 循环遍历
        int count = 0;  //计算器
        while (true){
            //6.1. 让数字与1做与运算，得到数字最后一位的bit位   // 判断bit位是否为0
            if((num & 1) == 0){
                //如果为0，说明未签到，结束
                break;
            }else {
                //如果不为0，说明已签到，计数器+1
                count++;
            }
            //数字右移一位，抛弃最后一位，准备与下一位做与运算
            num >>>= 1;
        }
        return Result.ok(count);
    }

    private User createUserWithPhone(String phone) {
        //1.创建用户
        User user = new User();
        user.setPhone(phone);
        user.setNickName(SystemConstants.USER_NICK_NAME_PREFIX + RandomUtil.randomString(10));

        //2.保存用户
        save(user);
        return user;
    }
}
