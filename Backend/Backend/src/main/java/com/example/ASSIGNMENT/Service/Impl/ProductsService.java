package com.example.ASSIGNMENT.Service.Impl;

import com.example.ASSIGNMENT.Model.Products;

import java.util.List;

public interface ProductsService {
   public List<Products> getAllProducts();

    public Products saveProducts(Products products);

//    String updateQuantity(long userId);
}
