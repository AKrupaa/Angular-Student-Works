package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class TestController {
    UserServiceImpl userServiceImpl;

    @Autowired
    public TestController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping(value = "/user/{id}", produces = {"application/json"})
    public ResponseEntity<User> getUser(@PathVariable(name = "id") long id, HttpServletResponse response){
        response.setStatus(201);
        return userServiceImpl.getUserById(id);
    }

    @GetMapping(value = "/allUsers", produces = {"application/json"})
    public ResponseEntity<List<User>> getUsers(HttpServletResponse response) {
        response.setStatus(201);
        return userServiceImpl.getUsers();
    }

    @PostMapping(value = "/user/")
    public ResponseEntity<String> postUser(@RequestBody User user){
        return userServiceImpl.postUser(user);
    }
}
