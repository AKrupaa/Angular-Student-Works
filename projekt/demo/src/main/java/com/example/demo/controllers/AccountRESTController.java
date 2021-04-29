package com.example.demo.controllers;

import com.example.demo.component.AccountModelAssembler;
import com.example.demo.exception.AccountNotFoundException;
import com.example.demo.exception.AccountWithLoginAndPasswordNotFoundException;
import com.example.demo.model.Account;
import com.example.demo.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
public class AccountRESTController {

    //    private AccountService accountService;
    private final AccountRepository repository;
    private final AccountModelAssembler assembler;

    @Autowired
    public AccountRESTController(AccountRepository accountRepository, AccountModelAssembler accountModelAssembler) {
        this.repository = accountRepository;
        this.assembler = accountModelAssembler;
    }

    // Single item

//    @GetMapping("/employees/{id}")
//    Employee one(@PathVariable Long id) {
//
//        return repository.findById(id)
//                .orElseThrow(() -> new EmployeeNotFoundException(id));
//    }

    @GetMapping("/accounts/{id}")
    public EntityModel<Account> one(@PathVariable Long id) {

        Account account = repository.findById(id) //
                .orElseThrow(() -> new AccountNotFoundException(id));

//        return EntityModel.of(employee, //
////                dorzuc linka do siebie samego czyli /accounts/{id}
//                linkTo(methodOn(AccountRESTController.class).one(id)).withSelfRel(),
////                dorzuc linka do wszystkich metoda all()
//                linkTo(methodOn(AccountRESTController.class).all()).withRel("accounts"));
        return assembler.toModel(account);
    }


    @PostMapping("/accounts/{login}/{password}")
    public EntityModel<Account> checkLogin(@PathVariable String login, @PathVariable String password) {

//        if(acc == null) {
//            throw new AccountNotFoundException((long) -1.0);
//        }

        Account account = repository.findFirstByLoginAndPassword(login, password)
                .orElseThrow(() -> new AccountWithLoginAndPasswordNotFoundException(login, password));

        return assembler.toModel(account);
    }

//    @GetMapping("/accounts")
//    List<Account> all() {
//        return repository.findAll();
//    }

    @GetMapping("/accounts")
    public CollectionModel<EntityModel<Account>> all() {

//        List<EntityModel<Account>> accounts = repository.findAll().stream()
//                .map(employee -> EntityModel.of(account,
//                        linkTo(methodOn(AccountRESTController.class).one(account.getId())).withSelfRel(),
//                        linkTo(methodOn(AccountRESTController.class).all()).withRel("accounts")))
//                .collect(Collectors.toList());

        List<EntityModel<Account>> accounts = repository.findAll().stream()
//                :: They behave exactly as the lambda expressions.
//                account -> assembler.toModel(account);
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(accounts,
                linkTo(methodOn(AccountRESTController.class).all()).withSelfRel());
    }

//    @PostMapping("/accounts")
//    public Account newEmployee(@RequestBody Account newAccount) {
//        return repository.save(newAccount);
//    }

    @PostMapping("/accounts")
    ResponseEntity<?> newAccount(@RequestBody Account newAccount) {
        if(repository.existsAccountByLogin(newAccount.getLogin()))
            return ResponseEntity.badRequest().body("Account exists!");


        EntityModel<Account> entityModel = assembler.toModel(
                repository.save(newAccount));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

//    @PutMapping("/accounts/{id}")
//    public Account replaceEmployee(@RequestBody Account newEmployee, @PathVariable Long id) {
//
//        return repository.findById(id)
//                .map(employee -> {
//                    employee.setFirstname(newEmployee.getFirstname());
//                    employee.setSurname(newEmployee.getSurname());
//                    employee.setTickets(newEmployee.getTickets());
//                    return repository.save(employee);
//                })
//                .orElseGet(() -> {
//                    newEmployee.setId(id);
//                    return repository.save(newEmployee);
//                });
//    }

    @PutMapping("/accounts/{id}")
    ResponseEntity<?> replaceAccount(@RequestBody Account newAccount, @PathVariable Long id) {

        Account updatedAccount = repository.findById(id) //
                .map(account -> {
                    account.setLogin(newAccount.getLogin());
                    account.setPassword(newAccount.getPassword());
                    account.setTickets(newAccount.getTickets());
                    return repository.save(account);
                }) //
                .orElseGet(() -> {
                    newAccount.setId(id);
                    return repository.save(newAccount);
                });

        EntityModel<Account> entityModel = assembler.toModel(updatedAccount);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

//    @DeleteMapping("/accounts/{id}")
//    public void deleteAccount(@PathVariable Long id) {
//        repository.deleteById(id);
//    }

    @DeleteMapping("/accounts/{id}")
    ResponseEntity<?> deleteAccount(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
