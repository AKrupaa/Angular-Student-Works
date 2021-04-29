import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contact } from "./contact.model";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private contactsUrl = "http://localhost:8080/restApi/contacts";

  constructor(private http: HttpClient) {}

  /** GET contacts from the server */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  /** GET contact by id. Will 404 if id not found */
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap((_) => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /** PUT: update the contact on the server */
  updateContact(id: number, contact: Contact): Observable<any> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap((_) => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>("updateContact"))
    );
  }

  /** PUT: update the collection of contact on the server */
  updateContacts(contacts: Contact[]): Observable<any> {
    return this.http.put(this.contactsUrl, contacts, httpOptions).pipe(
      tap((_) => this.log(`updated contacts:\n ${contacts}`)),
      catchError(this.handleError<any>("updateContacts"))
    );
  }

  /** PATCH: Update the addressed member of the collection. */
  patchContact(id: number, contact: Contact): Observable<any> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.patch(url, contact, httpOptions).pipe(
      tap((_) => this.log(`updated contact id=${contact.id}`)),
      catchError(this.handleError<any>("updateContact"))
    );
  }

  /** POST: add a new contact to the server */
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, httpOptions).pipe(
      tap((contactAdded: Contact) =>
        this.log(`added contact id=${contactAdded.id}`)
      ),
      catchError(this.handleError<Contact>("addContact"))
    );
  }

  /** DELETE: delete the contact from the server */
  deleteContact(contact: Contact | number): Observable<Contact> {
    const id = typeof contact === "number" ? contact : contact.id;
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>("deleteContact"))
    );
  }

  /** DELETE: Delete the entire collection. */
  deleteContacts(): Observable<any> {
    return this.http.delete(this.contactsUrl, httpOptions).pipe(
      tap((_) => this.log(`All contacts deleted with status: ${_}`)),
      catchError(this.handleError<any>("deleteContacts"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ContactService message with the MessageService */
  private log(message: string) {
    console.log("ContactService: " + message);
  }
}
