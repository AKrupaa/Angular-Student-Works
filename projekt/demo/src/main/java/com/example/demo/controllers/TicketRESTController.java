package com.example.demo.controllers;

import com.example.demo.component.EventModelAssembler;
import com.example.demo.component.TicketModelAssembler;
import com.example.demo.exception.EventNotFoundException;
import com.example.demo.exception.TicketNotFoundException;
import com.example.demo.model.Event;
import com.example.demo.model.Ticket;
import com.example.demo.repositories.EventRepository;
import com.example.demo.repositories.TicketRepository;
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
public class TicketRESTController {
    private final TicketRepository repository;
    private final TicketModelAssembler assembler;

    @Autowired
    public TicketRESTController(TicketRepository ticketRepository, TicketModelAssembler ticketModelAssembler) {
        this.repository = ticketRepository;
        this.assembler = ticketModelAssembler;
    }

    // Single item

    @GetMapping("/tickets/{id}")
    public EntityModel<Ticket> one(@PathVariable Long id) {

        Ticket ticket = repository.findById(id) //
                .orElseThrow(() -> new TicketNotFoundException(id));

        return assembler.toModel(ticket);
    }

    @GetMapping("/tickets")
    public CollectionModel<EntityModel<Ticket>> all() {

        List<EntityModel<Ticket>> tickets = repository.findAll().stream()
//                :: They behave exactly as the lambda expressions.
//                account -> assembler.toModel(account);
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(tickets,
                linkTo(methodOn(TicketRESTController.class).all()).withSelfRel());
    }


    @GetMapping("/tickets/where/event/{eventID}")
    public CollectionModel<EntityModel<Ticket>> getTicketsToEvent(@PathVariable long eventID) {

        List<EntityModel<Ticket>> tickets = repository.findAllByEventIdAndTakenIsFalse(eventID).stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(tickets, linkTo(methodOn(TicketRESTController.class).all()).withSelfRel());
    }


    @PostMapping("/tickets")
    ResponseEntity<?> newTicket(@RequestBody Ticket newTicket) {

        EntityModel<Ticket> entityModel = assembler.toModel(repository.save(newTicket));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }


    @PutMapping("/tickets/{id}")
    ResponseEntity<?> replaceTicket(@RequestBody Ticket newTicket, @PathVariable Long id) {

        Ticket updatedTicket = repository.findById(id) //
                .map(ticket -> {
//                    ticket.setAccount(newTicket.getAccount());
                    ticket.setTaken(newTicket.isTaken());
                    ticket.setEvent(newTicket.getEvent());
                    ticket.setPrice(newTicket.getPrice());
                    return repository.save(ticket);
                }) //
                .orElseGet(() -> {
                    newTicket.setId(id);
                    return repository.save(newTicket);
                });

        EntityModel<Ticket> entityModel = assembler.toModel(updatedTicket);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }


    @DeleteMapping("/tickets/{id}")
    ResponseEntity<?> deleteTicket(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
