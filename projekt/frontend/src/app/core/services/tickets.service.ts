import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Ticket } from '../models/ticket';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient, private router: Router) {}

  private ticketUrl = 'http://localhost:8080/tickets';
  // events = [];

  // loggedIn: boolean;
  /** GET tickets from the server */
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketUrl);
  }

  /** GET ticket by id. Will 404 if id not found */
  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.get<Ticket>(url).pipe(
      tap((_) => this.log(`fetched ticket id=${id}`)),
      catchError(this.handleError<Ticket>(`getTicket id=${id}`))
    );
  }

  getTicketWhereEvent(id: number) :Observable<Ticket[]> {
    const url = `${this.ticketUrl}`+"/where/event/"+`${id}`;
    return this.http.get<Ticket[]>(url).pipe(
      map((response: any) => {
        // let data = response.json();
        // console.log(data);
        var costam = response["_embedded"];
        var cos = costam["ticketList"];
        // const pagination = response;
        return cos;
      }),
      tap((_) => this.log(`fetched tickets where event id =${id}`)),
      catchError(this.handleError<Ticket>(`getTicketWhereEvent id=${id}`))
    );
  }

  /** PUT: update the ticket on the server */
  updateTicket(id: number, ticket: Ticket): Observable<any> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.put(url, ticket, httpOptions).pipe(
      tap((_) => this.log(`updated ticket id=${ticket.id}`)),
      catchError(this.handleError<any>("updateTicket"))
    );
  }

  /** PUT: update the collection of tickets on the server */
  updateTickets(tickets: Ticket[]): Observable<any> {
    return this.http.put(this.ticketUrl, tickets, httpOptions).pipe(
      tap((_) => this.log(`updated events:\n ${tickets}`)),
      catchError(this.handleError<any>("updateTickets"))
    );
  }

  /** PATCH: Update the addressed member of the collection. */
  patchTicket(id: number, ticket: Ticket): Observable<any> {
    const url = `${this.ticketUrl}/${id}`;
    return this.http.patch(url, ticket, httpOptions).pipe(
      tap((_) => this.log(`updated ticket id=${ticket.id}`)),
      catchError(this.handleError<any>("patchTicket"))
    );
  }

  /** POST: add a new ticket to the server */
  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketUrl, ticket, httpOptions).pipe(
      tap((ticketAdded: Ticket) =>
        this.log(`added ticket id=${ticketAdded.id}`)
      ),
      catchError(this.handleError<Ticket>("addTicket"))
    );
  }

  /** DELETE: delete the ticket from the server */
  deleteTicket(ticket: Ticket | number): Observable<Ticket> {
    const id = typeof ticket === "number" ? ticket : ticket.id;
    const url = `${this.ticketUrl}/${id}`;
    return this.http.delete<Ticket>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted ticket id=${id}`)),
      catchError(this.handleError<Ticket>("deleteTicket"))
    );
  }

  /** DELETE: Delete the entire collection. */
  deleteTickets(): Observable<any> {
    return this.http.delete(this.ticketUrl, httpOptions).pipe(
      tap((_) => this.log(`All tickets deleted with status: ${_}`)),
      catchError(this.handleError<any>("deleteTickets"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
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
    console.log('TicketService: ' + message);
  }
}
