package com.example.ASSIGNMENT.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class CartQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long productId;
    private long cartcapacity;
@ManyToMany(mappedBy = "cartList")
@JsonIgnore
private List<UserLogin> userLoginList=new ArrayList<>();

}
