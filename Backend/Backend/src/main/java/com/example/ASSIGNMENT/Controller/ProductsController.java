package com.example.ASSIGNMENT.Controller;

import com.example.ASSIGNMENT.Model.Products;
import com.example.ASSIGNMENT.Service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping("api/products")
public class ProductsController {

    @Autowired
    ProductsService productsService;

    //get all products details
    @GetMapping("/get")
    List<Products>getAllProducts(){
        return productsService.getAllProducts();
    }

    //post the data
    @PostMapping("/post")
    ResponseEntity<Products>saveProducts(@RequestBody Products products){
        return new ResponseEntity<Products>(productsService.saveProducts(products), HttpStatus.CREATED);
    }




}
