package com.example.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
//@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String description;

//    @OneToMany(mappedBy = "event",
//            cascade = CascadeType.ALL)
//    private Set<Ticket> tickets;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



//    public Set<Ticket> getTickets() {
//        return tickets;
//    }
//
//    public void setTickets(Set<Ticket> tickets) {
//        this.tickets = tickets;
//    }
}




//class User:
//        List<Bilet> bilety;
//
//class Bilet:
//        Event event;
//
//        Metoda:
//        boolean isUserParticipate(Event event){
//        return user.bilety.stream().filter(bilet -> bilet.event == event).collect().toList().isNotEmpty();
//        }