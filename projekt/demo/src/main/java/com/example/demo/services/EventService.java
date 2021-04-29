package com.example.demo.services;

import com.example.demo.model.Event;
import com.example.demo.repositories.EventRepository;
//import com.example.demo.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event get(long id) {
        return eventRepository.getOne(id);
    }

    public void add(Event event) {
        eventRepository.save(event);
    }

    public void delete(long id) {
        eventRepository.deleteById(id);
    }

    public void delete(Event event) {
        eventRepository.delete(event);
    }

//    public ResponseEntity

}
