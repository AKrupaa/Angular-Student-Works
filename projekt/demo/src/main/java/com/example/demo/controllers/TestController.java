//package com.example.demo.controllers;
//
//import com.example.demo.model.User;
//import com.example.demo.services.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.http.HttpServletResponse;
//
//@RestController
//public class TestController {
//
////    for(String s : stringArray) {
////        doSomethingWith(s);
////    }
//
//    @Autowired
//    UserService userService;
//
//    @GetMapping(value = "/user/{id}", produces = {"application/json"})
//    public ResponseEntity<User> getUser(@PathVariable(name = "id") long id, HttpServletResponse response) {
////        response.setStatus(201);
//        return userService.getUserById(id);
//    }
//
//    @PostMapping(value = "/user/")
//    public ResponseEntity postUser(@RequestBody User user) {
//        return userService.postUser(user);
//    }
//}
