package com.example.demo.repositories;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
//    Event findFirstById(Long id);
//    List<Event> findAllByIDA
}
