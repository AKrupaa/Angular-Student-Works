package com.example.demo.component;

import com.example.demo.controllers.EventRESTController;
import com.example.demo.model.Event;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class EventModelAssembler implements RepresentationModelAssembler<Event, EntityModel<Event>> {
    @Override
    public EntityModel<Event> toModel(Event entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(EventRESTController.class).one(entity.getId())).withSelfRel(),
                linkTo(methodOn(EventRESTController.class).all()).withRel("events"));
    }
}
