package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.model.Ticket;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class TicketRestController {

    private final TicketRepository repository;

    @Autowired
    public TicketRestController(TicketRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/ticket/{id}")
    public Optional<Ticket> one(@PathVariable Long id) {
        Optional<Ticket> ticket = repository.findById(id);
        return ticket;
    }

    @GetMapping("/ticket")
    public List<Ticket> all() {
        List<Ticket> tickets = repository.findAll();
        return tickets;
    }

    @PostMapping("/ticket/multiple")
    ResponseEntity<?> newTickets(@RequestBody List<Ticket> newTickets) {

        repository.saveAll(newTickets);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/ticket/delete/multiple")
    ResponseEntity<?> ticketsToDelete(@RequestBody List<Ticket> ticketsToDelete) {

        repository.deleteAll(ticketsToDelete);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/ticket")
    ResponseEntity<?> newTicket(@RequestBody Ticket newTicket) {

        Ticket entityModel = repository.save(newTicket);
        return ResponseEntity.ok().body(entityModel);
    }

    @GetMapping("/ticket/where/event/{eventID}")
    public Optional<List<Ticket>> getTicketsToEvent(@PathVariable long eventID) {
        Optional<List<Ticket>> tickets = repository.findAllByEventIdAndTakenIsFalse(eventID);
        return tickets;
    }

    @PutMapping("/ticket/{id}")
    ResponseEntity<?> replace(@RequestBody Ticket newTicket, @PathVariable Long id) {

        Ticket updatedTicket = repository.findById(id)
                .map(ticket -> {
                    ticket.setTaken(newTicket.isTaken());
                    ticket.setEvent(newTicket.getEvent());
                    ticket.setPrice(newTicket.getPrice());
                    return repository.save(ticket);
                })
                .orElseGet(() -> {
                    newTicket.setId(id);
                    return repository.save(newTicket);
                });

        return ResponseEntity
                .status(HttpStatus.CREATED).body(updatedTicket);
    }

    @DeleteMapping("/ticket/{id}")
    ResponseEntity<?> delete(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
