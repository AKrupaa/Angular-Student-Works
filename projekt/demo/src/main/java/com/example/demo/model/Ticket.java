package com.example.demo.model;

import javax.persistence.*;

@Entity
//@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    //    jeden ticket do jednego eventu, po prostu pole wskazujace na wydarzenie
//    mapuje na zmienna w evencie o nazwie oneTicket, z ktora ma byc powiazana
    @ManyToOne(
            fetch = FetchType.EAGER
    )
//    @JoinColumn(name = "event_id")
    private Event event;

//    @ManyToOne(fetch = FetchType.EAGER)
//    private Account account;
    private boolean taken;

    private float price;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isTaken() {
        return taken;
    }

    public void setTaken(boolean taken) {
        this.taken = taken;
    }
    //    public Account getAccount() {
//        return account;
//    }
//
//    public void setAccount(Account account) {
//        this.account = account;
//    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }
}
