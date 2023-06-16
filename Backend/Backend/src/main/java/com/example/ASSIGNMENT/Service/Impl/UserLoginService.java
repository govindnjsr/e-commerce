package com.example.ASSIGNMENT.Service.Impl;

import com.example.ASSIGNMENT.Model.Products;
import com.example.ASSIGNMENT.Model.UserLogin;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserLoginService {
    List<UserLogin> getLoginData();

    UserLogin postLoginData(UserLogin userLogin);

    List<Products> addToCartElements(long userid,long productId,long quantity);

    List<Products> removeToCartElements(long userId, long productId);

    UserLogin getDataById(long userId);

    long userVerification(String username, String password);

    List<Products> getdatabyuserid(long userId);

    String updateQuantity(long userId);
}
