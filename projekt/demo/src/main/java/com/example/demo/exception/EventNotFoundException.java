package com.example.demo.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(Long id) {
        super("Could not find event " + id);
    }
}
