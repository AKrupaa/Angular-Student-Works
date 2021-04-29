package pl.dmcs.rkotas.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.dmcs.rkotas.model.Contact;
import pl.dmcs.rkotas.repository.ContactRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ContactServiceImpl implements ContactService {

    ContactRepository contactRepository;

    @Autowired
    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact getContact(long id) {
        return contactRepository.findById(id);
    }

    @Override
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @Override
    public void addContact(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    public void removeContact(long id) {
        contactRepository.deleteById(id);
    }

    @Override
    public void removeContacts() {
        contactRepository.deleteAll();
    }

    @Override
    public void updateContact(Contact contact) {
        contactRepository.save(contact);
    }

    @Override
    public List<Contact> updateContacts(List<Contact> contactsList) {

        List<Contact> contacts = contactRepository.findAll();
        ArrayList<Long> allIDContactsFromRepo = new ArrayList<>();
        ArrayList<Long> allFetchedIDContacts = new ArrayList<>();
        contacts.forEach(contact -> {
            allIDContactsFromRepo.add(contact.getId());
        });
        contactsList.forEach(contact -> {
            allFetchedIDContacts.add(contact.getId());
        });

        allIDContactsFromRepo.removeAll(allFetchedIDContacts);

        for (int i = 0; i < allIDContactsFromRepo.size(); i++) {
            contactRepository.deleteById(allIDContactsFromRepo.get(i));
        }

        contactsList.forEach(contact -> {
            Contact tempContact;
            tempContact = contactRepository.findById(contact.getId());
            if (tempContact == null) {
                System.out.println("baza jest pusta, tworze nowego goscia");
                tempContact = new Contact();
//                tempContact.setId(contact.getId());
//                set id nie dziala i tyle.
            }
            tempContact.setFirstname(contact.getFirstname());
            tempContact.setLastname(contact.getLastname());
            tempContact.setEmail(contact.getEmail());
            tempContact.setTelephone(contact.getTelephone());
            contactRepository.save(tempContact);
        });
        return contactRepository.findAll();
    }

    @Override
    public void updateContact(Contact contact, Map<String, Object> updates) {
        if (updates.containsKey("firstname")) {
            contact.setFirstname((String) updates.get("firstname"));
        }
        if (updates.containsKey("lastname")) {
            contact.setLastname((String) updates.get("lastname"));
        }
        if (updates.containsKey("email")) {
            contact.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("telephone")) {
            contact.setTelephone((String) updates.get("telephone"));
        }
        contactRepository.save(contact);
    }
}