package com.example.demo.services;

import com.example.demo.model.User;
import com.example.demo.repositories.UserRepositories;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class UserServiceImpl {

    UserRepositories userRepositories;

    @Autowired
    public UserServiceImpl(UserRepositories userRepositories){
        this.userRepositories = userRepositories;
    }

    public ResponseEntity<User> getUserById(long id){
        return ResponseEntity.badRequest().body(userRepositories.findFirstById(id));
    }

    public ResponseEntity<String> postUser(User user){
        userRepositories.save(user);
        return ResponseEntity.ok("UDALO SIE");
    }

    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userRepositories.findAll());
    }
}
