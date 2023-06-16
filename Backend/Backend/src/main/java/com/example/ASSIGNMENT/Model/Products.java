package com.example.ASSIGNMENT.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@Table(name = "products")
public class Products {

    @jakarta.persistence.Id
    private long id;
    private String title;
    private double price;
    private String description;
    private String category;
    private String image;
    private long rating;
    private long totalCustomers;
    private long actualquantity;
    private long cartQuantity;

}
