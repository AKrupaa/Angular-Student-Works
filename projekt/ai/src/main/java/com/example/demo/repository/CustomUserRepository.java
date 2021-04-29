package com.example.demo.repository;

import com.example.demo.model.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {

    Optional<List<CustomUser>> findFirstByLogin(String login);
    Optional<CustomUser> findFirstByLoginAndPassword(String login, String password);
    boolean existsUserByLogin(String login);
}
