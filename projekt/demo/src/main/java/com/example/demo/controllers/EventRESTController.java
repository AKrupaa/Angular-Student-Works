package com.example.demo.controllers;

import com.example.demo.component.AccountModelAssembler;
import com.example.demo.component.EventModelAssembler;
import com.example.demo.exception.AccountNotFoundException;
import com.example.demo.exception.EventNotFoundException;
import com.example.demo.model.Account;
import com.example.demo.model.Event;
import com.example.demo.repositories.AccountRepository;
import com.example.demo.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
public class EventRESTController {
    private final EventRepository repository;
    private final EventModelAssembler assembler;

    @Autowired
    public EventRESTController(EventRepository eventRepository, EventModelAssembler eventModelAssembler) {
        this.repository = eventRepository;
        this.assembler = eventModelAssembler;
    }

    // Single item

    @GetMapping("/events/{id}")
    public EntityModel<Event> one(@PathVariable Long id) {

        Event event = repository.findById(id) //
                .orElseThrow(() -> new EventNotFoundException(id));

        return assembler.toModel(event);
    }

    @GetMapping("/events")
    public CollectionModel<EntityModel<Event>> all() {

        List<EntityModel<Event>> events = repository.findAll().stream()
//                :: They behave exactly as the lambda expressions.
//                account -> assembler.toModel(account);
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(events,
                linkTo(methodOn(AccountRESTController.class).all()).withSelfRel());
    }


    @PostMapping("/events")
    ResponseEntity<?> newEvent(@RequestBody Event newEvent) {

        EntityModel<Event> entityModel = assembler.toModel(repository.save(newEvent));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }


    @PutMapping("/events/{id}")
    ResponseEntity<?> replaceEvent(@RequestBody Event newEvent, @PathVariable Long id) {

        Event updatedEvent = repository.findById(id) //
                .map(event -> {
                    event.setName(newEvent.getName());
                    event.setDescription(newEvent.getDescription());
//                    event.setTickets(newEvent.getTickets());
                    return repository.save(event);
                }) //
                .orElseGet(() -> {
                    newEvent.setId(id);
                    return repository.save(newEvent);
                });

        EntityModel<Event> entityModel = assembler.toModel(updatedEvent);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }


    @DeleteMapping("/events/{id}")
    ResponseEntity<?> deleteEvent(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
