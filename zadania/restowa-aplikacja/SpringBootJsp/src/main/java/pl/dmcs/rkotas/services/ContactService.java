package pl.dmcs.rkotas.services;

import pl.dmcs.rkotas.model.Contact;

import java.util.List;
import java.util.Map;

public interface ContactService {
    public Contact getContact(long id);
    public List<Contact> getContacts();
    public void addContact(Contact contact);
    public void removeContact(long id);
    public void removeContacts();
    public void updateContact(Contact contact);
    public List<Contact> updateContacts(List<Contact> contactsList);
    public void updateContact(Contact contact, Map<String, Object> updates);
}