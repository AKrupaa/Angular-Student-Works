package pl.dmcs.rkotas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.rkotas.model.Contact;
import pl.dmcs.rkotas.repository.ContactRepository;
import pl.dmcs.rkotas.services.ContactService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/contacts")
public class ContactRESTController {

    private final ContactService contactService;
    private final ContactRepository contactRepository;

    @Autowired
    public ContactRESTController(ContactService contactService, ContactRepository contactRepository) {
        this.contactService = contactService;
        this.contactRepository = contactRepository;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~ GET ~~~~~~~~~~~~~~~~~~~~~~

    // All items
    @GetMapping
    public List<Contact> findAllContacts() {
        return contactService.getContacts();
    }

    // Single item
    @GetMapping(value = "/{id}")
    public Contact getOneContact(@PathVariable("id") long id) {
        return contactService.getContact(id);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~ PUT ~~~~~~~~~~~~~~~~~~~~~~

    //    All items
    @PutMapping
    public ResponseEntity<List<Contact>> updateContacts(@RequestBody List<Contact> contactsList) {

        List<Contact> returnedContacts;
        returnedContacts = contactService.updateContacts(contactsList);
        return new ResponseEntity<List<Contact>>(returnedContacts, HttpStatus.OK);
    }

    //    Single item
    @PutMapping(value = "/{id}")
    public ResponseEntity<Contact> updateContact(@RequestBody Contact contact, @PathVariable("id") long id) {
        contact.setId(id);

        contactService.updateContact(contact);
        return new ResponseEntity<Contact>(HttpStatus.NO_CONTENT);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~ PATCH ~~~~~~~~~~~~~~~~~~~~~~
    @PatchMapping(value = "/{id}")
    public ResponseEntity<Contact> updatePartOfContact(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Contact contact = contactService.getContact(id);
        if (contact == null) {
            System.out.println("Contact not found!");
            return new ResponseEntity<Contact>(HttpStatus.NOT_FOUND);
        }

        contactService.updateContact(contact, updates);
        return new ResponseEntity<Contact>(HttpStatus.NO_CONTENT);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~

    //    Single item
    @PostMapping
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        contactService.addContact(contact);
        return new ResponseEntity<Contact>(contact, HttpStatus.CREATED);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~~~

    //    All items
    @DeleteMapping
    public ResponseEntity<String> deleteContacts() {
        contactService.removeContacts();
        return new ResponseEntity<String>("Entity deleted", HttpStatus.OK);
    }

    //    Single Item
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Contact> deleteContact(@PathVariable("id") long id) {
        Contact contact = contactService.getContact(id);
        if (contact == null) {
            System.out.println("Contact not found!");
            return new ResponseEntity<Contact>(HttpStatus.NOT_FOUND);
        }

        contactService.removeContact(id);
        return new ResponseEntity<Contact>(HttpStatus.NO_CONTENT);
    }
}


