package com.example.demo.exception;

public class AccountWithLoginAndPasswordNotFoundException extends RuntimeException {
    public AccountWithLoginAndPasswordNotFoundException(String login, String password) {
        super("Could not find account with login: " + login + " and password: " + password);
    }
}
