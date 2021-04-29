package com.example.demo.controller;

import com.example.demo.model.Test;
import com.example.demo.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    TestRepository testRepository;

    @Autowired
    public HelloController(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @GetMapping(value = "/")
    public List<Test> hello() {
        return testRepository.findAll();
    }

    @PostMapping(value = "/")
    public ResponseEntity<Test> addTest(@RequestBody Test test) {

        testRepository.save(test);
        return new ResponseEntity<Test>(HttpStatus.CREATED);
    }
}
