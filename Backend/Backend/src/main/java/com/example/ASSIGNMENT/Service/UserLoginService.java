package com.example.ASSIGNMENT.Service;

import com.example.ASSIGNMENT.Model.CartQuantity;
import com.example.ASSIGNMENT.Model.Products;
import com.example.ASSIGNMENT.Model.UserLogin;
import com.example.ASSIGNMENT.Repository.ProductRepository;
import com.example.ASSIGNMENT.Repository.UserLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserLoginService implements com.example.ASSIGNMENT.Service.Impl.UserLoginService {

    @Autowired
    UserLoginRepository userLoginRepository;

    @Autowired
    ProductRepository productRepository;
    @Override
    public List<UserLogin> getLoginData() {
        return userLoginRepository.findAll();
    }

    @Override
    public UserLogin postLoginData(UserLogin userLogin) {
        return userLoginRepository.save(userLogin);
    }

    @Override
    public List<Products> addToCartElements(long userid,long productId,long quantity) {
        UserLogin userLogin=userLoginRepository.findById(userid).get();
        List<CartQuantity>cartQuantities=userLogin.getCartList();
        CartQuantity cartQuantity1=new CartQuantity();
        cartQuantity1.setCartcapacity(quantity);
        cartQuantity1.setProductId(productId);
        cartQuantities.add(cartQuantity1);
        userLogin.setCartList(cartQuantities);
        userLoginRepository.save(userLogin);

        List<Products>allProducts=new ArrayList<>();
        allProducts=getdatabyuserid(userid);
        return allProducts;
    }

    @Override
    public List<Products> removeToCartElements(long userId, long productId) {
        UserLogin userLogin=userLoginRepository.findById(userId).get();
        List<CartQuantity>cartQuantities=userLogin.getCartList();
        List<CartQuantity>newCartQuantity=new ArrayList<>();
        for(int i=0;i<cartQuantities.size();i++){
            if(cartQuantities.get(i).getProductId()!=productId){
                newCartQuantity.add(cartQuantities.get(i));
            }
        }
        userLogin.setCartList(newCartQuantity);
        userLoginRepository.save(userLogin);
        List<Products>allProducts=new ArrayList<>();
        allProducts=getdatabyuserid(userId);
        return allProducts;
    }

    @Override
    public UserLogin getDataById(long userId) {

        UserLogin userLogin=userLoginRepository.findById(userId).get();
        return userLogin;
    }

    @Override
    public long userVerification(String username, String password) {
        List<UserLogin>users=userLoginRepository.findAll();
        long Id=-1;
        for(int i=0;i<users.size();i++){
            if(users.get(i).getUsername().equals(username) &&
               users.get(i).getPassword().equals(password)){
                Id=users.get(i).getId();
            }
        }
        return Id;
    }

    @Override
    public  List<Products> getdatabyuserid(long userId) {
        UserLogin userLogin=userLoginRepository.findById(userId).get();
        List<CartQuantity>cartQuantityList=userLogin.getCartList();
        Set<Products> allcartProducts=new HashSet<>();
        for(int i=0;i<cartQuantityList.size();i++){
            Products product1=productRepository.findById(cartQuantityList.get(i).getProductId()).get();
            product1.setCartQuantity(cartQuantityList.get(i).getCartcapacity());
            allcartProducts.add(product1);
        }
        List<Products>newList=new ArrayList<>();
        newList.addAll(allcartProducts);
        return newList;
    }

    @Override
    public String updateQuantity(long userId) {
        UserLogin userLogin=userLoginRepository.findById(userId).get();
        List<Products>userCartProducts=getdatabyuserid(userId);

        for(int i=0;i<userCartProducts.size();i++){
            Products product=productRepository.findById(userCartProducts.get(i).getId()).get();
            product.setActualquantity(product.getActualquantity()-userCartProducts.get(i).getCartQuantity());
            productRepository.save(product);
        }
        userLogin.setCartList(new ArrayList<>());
        userLoginRepository.save(userLogin);
        return "Updated";
    }
}
