package com.example.demo.services;

import com.example.demo.model.Account;
import com.example.demo.model.Event;
import com.example.demo.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account add(Account account) {
        return accountRepository.save(account);
//        return ResponseEntity.ok("New user added!");
    }

    public Optional<Account> get(long id) {
        return accountRepository.findById(id);
//        return ResponseEntity.ok("New user added!");
    }

    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    public void delete(long id) {
        accountRepository.deleteById(id);
    }

    public void delete(Account account) {
        accountRepository.delete(account);
    }

    private boolean isUserParticipate(Event event, long accountId){
        Account account = accountRepository.getOne(accountId);
        // steam = tak naprawde itearacja po liscie Tickets
        return account.getTickets().stream().anyMatch(ticket -> ticket.getEvent() == event);
    }

    public Account edit(Account account) {
        return accountRepository.save(account);
    }

    // buy ticket
}