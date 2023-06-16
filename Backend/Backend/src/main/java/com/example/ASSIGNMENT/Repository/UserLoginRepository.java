package com.example.ASSIGNMENT.Repository;

import com.example.ASSIGNMENT.Model.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLogin,Long> {

}
