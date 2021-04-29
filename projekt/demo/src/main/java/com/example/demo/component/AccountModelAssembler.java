package com.example.demo.component;

import com.example.demo.controllers.AccountRESTController;
import com.example.demo.model.Account;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@Component
public class AccountModelAssembler implements RepresentationModelAssembler<Account, EntityModel<Account>> {

    @Override
    public EntityModel<Account> toModel(Account entity) {
        return EntityModel.of(entity,
                linkTo(methodOn(AccountRESTController.class).one(entity.getId())).withSelfRel(),
                linkTo(methodOn(AccountRESTController.class).all()).withRel("accounts"));
    }
}
