package com.example.demo.controller;

import com.example.demo.model.CustomUser;
import com.example.demo.repository.CustomUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class CustomUserRestController {

    private final CustomUserRepository repository;

    @Autowired
    public CustomUserRestController(CustomUserRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/user/{id}")
    public Optional<CustomUser> one(@PathVariable Long id) {
        Optional<CustomUser> user = repository.findById(id);
        return user;
    }

    @PostMapping("/user/{login}/{password}")
    public Optional<CustomUser> checkLogin(@PathVariable String login, @PathVariable String password) {
        Optional<CustomUser> user = repository.findFirstByLoginAndPassword(login, password);
        return user;
    }

    @GetMapping("/user")
    public List<CustomUser> all() {
        List<CustomUser> users = repository.findAll();
        return users;
    }

    @PostMapping("/user")
    ResponseEntity<?> newUser(@RequestBody CustomUser user) {
        if (repository.existsUserByLogin(user.getLogin()))
            return ResponseEntity.badRequest().body("User exists!");

        CustomUser entityModel = repository.save(user);
        return ResponseEntity.ok().body(entityModel);
    }

    @PutMapping("/user/{id}")
    ResponseEntity<?> replace(@RequestBody CustomUser newUser, @PathVariable Long id) {

        CustomUser updatedUser = repository.findById(id)
                .map(user -> {
                    user.setLogin(newUser.getLogin());
                    user.setPassword(newUser.getPassword());
                    user.setTickets(newUser.getTickets());
                    return repository.save(user);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return repository.save(newUser);
                });

        return ResponseEntity.status(HttpStatus.CREATED).body(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    ResponseEntity<?> delete(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
