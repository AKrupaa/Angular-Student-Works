package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class EventRestController {

    EventRepository repository;

    @Autowired
    public EventRestController(EventRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/event/{id}")
    public Optional<Event> one(@PathVariable Long id) {
        Optional<Event> event = repository.findById(id);
        return event;
    }

    @GetMapping("/event")
    public List<Event> all() {
        List<Event> event = repository.findAll();
        return event;
    }

    @PostMapping("/event")
    ResponseEntity<?> newEvent(@RequestBody Event newEvent) {

        Event entityModel = repository.save(newEvent);
        return ResponseEntity.ok().body(entityModel);
    }

    @PutMapping("/event/{id}")
    ResponseEntity<?> replace(@RequestBody Event newEvent, @PathVariable Long id) {

        Event updatedEvent = repository.findById(id)
                .map(event -> {
                    event.setDescription(newEvent.getDescription());
                    return repository.save(event);
                })
                .orElseGet(() -> {
                    newEvent.setId(id);
                    return repository.save(newEvent);
                });

        return ResponseEntity
                .status(HttpStatus.CREATED).body(updatedEvent);
    }

    @DeleteMapping("/event/{id}")
    ResponseEntity<?> delete(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
