import { Component, OnInit } from "@angular/core";
import { Contact } from "./contact.model";
import { ContactService } from "./contact.service";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"],
  providers: [ContactService],
})
export class ContactListComponent implements OnInit {
  contactList: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService
      .getContacts()
      .subscribe((contactList) => (this.contactList = contactList));
  }

  getContact(id: number): void {
    this.contactService.getContact(id).subscribe((returnedContact) =>
      this.contactList.map((element) => {
        if (element.id == id) {
          // console.log("ContactComponent:\n " + element.telephone + "\n" + returnedContact.telephone);
          element = returnedContact;
          this.showUpdatedItem(element);
          // console.log("ContactComponent:\n " + element.telephone + "\n" + returnedContact.telephone);
          // console.log("ContactComponent:\n " + this.contactList[1].telephone + "\n" + returnedContact.telephone);
        }
      })
    );
  }

  putContact(id: number, contact: Contact): void {
    this.contactService.updateContact(id, contact).subscribe((nothing) => {
      this.showUpdatedItem(contact);
    });
  }

  putContacts(contacts: Contact[]): void {
    this.contactService
      .updateContacts(contacts)
      .subscribe((returnedContactsList) => {
        this.contactList = returnedContactsList;
      });
  }

  patchContact(id: number, contact: Contact): void {
    this.contactService.patchContact(id, contact).subscribe((nothing) => {
      this.showUpdatedItem(contact);
    });
  }

  add(
    firstname: string,
    lastname: string,
    email: string,
    telephone: string
  ): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.contactService
      .addContact({ firstname, lastname, email, telephone } as Contact)
      .subscribe((contact) => {
        this.contactList.push(contact);
      });
  }

  delete(contact: Contact): void {
    this.contactList = this.contactList.filter((c) => c !== contact);
    this.contactService.deleteContact(contact).subscribe();
  }

  deleteContacts(): void {
    this.contactService.deleteContacts().subscribe((nothing) => {
      this.contactList= [];
    });
  }

  private showUpdatedItem(newItem) {
    let updateItem = this.contactList.find(this.findIndexToUpdate, newItem.id);
    let index = this.contactList.indexOf(updateItem);
    this.contactList[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
}
