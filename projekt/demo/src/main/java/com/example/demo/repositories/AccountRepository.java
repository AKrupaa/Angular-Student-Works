package com.example.demo.repositories;

import com.example.demo.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findFirstByLoginAndPassword(String login, String password);
    Optional<Account> findFirstByLogin(String login);
    boolean existsAccountByLogin(String login);
    //@Query("SELECT * FROM users u WHERE u.id = ?1")
//    User findFirstById(Long id);
}
