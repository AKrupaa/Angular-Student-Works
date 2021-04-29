package com.example.demo.component;

import com.example.demo.controllers.EventRESTController;
import com.example.demo.controllers.TicketRESTController;
import com.example.demo.model.Event;
import com.example.demo.model.Ticket;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class TicketModelAssembler implements RepresentationModelAssembler<Ticket, EntityModel<Ticket>> {
    @Override
    public EntityModel<Ticket> toModel(Ticket entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(TicketRESTController.class).one(entity.getId())).withSelfRel(),
                linkTo(methodOn(TicketRESTController.class).all()).withRel("tickets"));
    }
}
