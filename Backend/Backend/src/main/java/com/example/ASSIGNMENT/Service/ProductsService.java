package com.example.ASSIGNMENT.Service;

import com.example.ASSIGNMENT.Model.Products;
import com.example.ASSIGNMENT.Model.UserLogin;
import com.example.ASSIGNMENT.Repository.ProductRepository;
import com.example.ASSIGNMENT.Repository.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService implements com.example.ASSIGNMENT.Service.Impl.ProductsService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserLoginRepository userLoginRepository;
    @Override
    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Products saveProducts(Products products) {
        return productRepository.save(products);
    }

}
