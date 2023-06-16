package com.example.ASSIGNMENT.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class UserLogin {
    @Id
    @SequenceGenerator(
            name = "login_seq",
            sequenceName = "login_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "login_seq"
    )
    private long id;
    private String username;
    private String password;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "userxcart",
            joinColumns = {
                    @JoinColumn(name="userxid",referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(
                            name="cartxid",
                            referencedColumnName = "id"
                    )
            }
    )
    private List<CartQuantity>cartList=new ArrayList<>();
}
