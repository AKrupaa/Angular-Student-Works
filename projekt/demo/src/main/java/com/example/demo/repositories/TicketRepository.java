package com.example.demo.repositories;

import com.example.demo.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
//    Ticket findFirstById(Long id);
//    List<Ticket> findAllByEventIdAndAccountIsNull(long eventID);
    List<Ticket> findAllByEventIdAndTakenIsFalse(long eventID);
}
