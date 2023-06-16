package com.example.ASSIGNMENT.Controller;

import com.example.ASSIGNMENT.Model.Products;
import com.example.ASSIGNMENT.Model.UserLogin;
import com.example.ASSIGNMENT.Service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userlogin")
@CrossOrigin(origins = "http://localhost:3001")
public class UserLoginController {

    @Autowired
    UserLoginService userLoginService;
    //get all data

    //1)check login
    @PostMapping("/verification/{username}/{password}")
    public long userVerification(@PathVariable String username,@PathVariable String password){

        return userLoginService.userVerification(username,password);
    }

    //2)post data
    @PostMapping("/post")
    public ResponseEntity<UserLogin>postLoginData(@RequestBody UserLogin userLogin){
        return new ResponseEntity<UserLogin>(userLoginService.postLoginData(userLogin), HttpStatus.CREATED);
    }

    //get
    @GetMapping("/get")
    public List<UserLogin> getLoginData(){
        return userLoginService.getLoginData();
    }

    //get data by id
    @GetMapping("/get/{userId}")
    public UserLogin getDataById(@PathVariable long userId){
        return userLoginService.getDataById(userId);

    }
    //get data by user id
    @GetMapping("/getdata/{userId}")
    public List<Products> getdatabyuserid(@PathVariable long userId){

        return userLoginService.getdatabyuserid(userId);
    }


    //add to cart for a particular person
    @PostMapping("/{userid}/addtocart/{productId}/{quantity}")
    public List<Products>addToCartElements(@PathVariable long userid,
                                                      @PathVariable long productId,
                                                      @PathVariable long quantity){
        return userLoginService.addToCartElements(userid,productId,quantity);
    }
    //remove from cart
    @PostMapping("/{userId}/removetocart/{productId}")
    public List<Products> removeToCartElements(@PathVariable long userId,@PathVariable long productId){
        return (userLoginService.removeToCartElements(userId,productId));
    }


    //update the Actual quantities
    @PutMapping("/updatequantity/{userId}")
    String updateQuantity(@PathVariable long userId){

        return userLoginService.updateQuantity(userId);

    }
}
