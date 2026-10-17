package com.eas30n.zhistack.service;

import com.eas30n.zhistack.dto.Result;
import com.eas30n.zhistack.entity.Post;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
public interface IPostService extends IService<Post> {

    Result queryHotPost(Integer current);

    Result queryPostById(Long id);

    Result likePost(Long id);

    Result queryPostLikes(Long id);

    Result savePost(Post post);

    Result queryPostOfFollow(Long max, Integer offset);
}
