package com.example.demo.repositories;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositories extends JpaRepository<User, Long> {
    //@Query("SELECT * FROM users u WHERE u.id = ?1")
    User findFirstById(Long id);
}
