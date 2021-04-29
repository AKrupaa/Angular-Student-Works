package com.example.demo.services;

import com.example.demo.model.Ticket;
import com.example.demo.repositories.TicketRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public void add(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public Ticket get(long id) {
        return ticketRepository.getOne(id);
    }

    public void edit(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public void delete(long id) {
        ticketRepository.deleteById(id);
    }

    public void delete(Ticket ticket) {
        ticketRepository.delete(ticket);
    }

}
