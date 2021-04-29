package com.example.demo.exception;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(Long id) {
        super("Could not find ticket " + id);
    }
}
