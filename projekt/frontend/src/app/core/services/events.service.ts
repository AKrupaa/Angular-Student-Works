import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Event } from '../models/event';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private eventUrl = 'http://localhost:8080/events';
  // events = [];

  // loggedIn: boolean;
  /** GET events from the server */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl).pipe(
      map((response: any) => {
        // let data = response.json();
        // console.log(data);
        var costam = response['_embedded'];
        var cos = costam['eventList'];
        // const pagination = response;
        return cos;
      })
    );
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: number): Observable<Event> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      tap((_) => this.log(`fetched event id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`))
    );
  }

  /** PUT: update the event on the server */
  updateEvent(id: number, event: Event): Observable<any> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.put(url, event, httpOptions).pipe(
      tap((_) => this.log(`updated event id=${event.id}`)),
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  /** PUT: update the collection of events on the server */
  updateEvents(events: Event[]): Observable<any> {
    return this.http.put(this.eventUrl, events, httpOptions).pipe(
      tap((_) => this.log(`updated events:\n ${events}`)),
      catchError(this.handleError<any>('updateEvents'))
    );
  }

  /** PATCH: Update the addressed member of the collection. */
  patchEvent(id: number, event: Event): Observable<any> {
    const url = `${this.eventUrl}/${id}`;
    return this.http.patch(url, event, httpOptions).pipe(
      tap((_) => this.log(`updated event id=${event.id}`)),
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  /** POST: add a new event to the server */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, event, httpOptions).pipe(
      tap((eventAdded: Event) => this.log(`added event id=${eventAdded.id}`)),
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  /** DELETE: delete the event from the server */
  deleteEvent(event: Event | number): Observable<any> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.eventUrl}/${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  /** DELETE: Delete the entire collection. */
  deleteEvents(): Observable<any> {
    return this.http.delete(this.eventUrl, httpOptions).pipe(
      tap((_) => this.log(`All events deleted with status: ${_}`)),
      catchError(this.handleError<any>('deleteEvents'))
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
    console.log('EventService: ' + message);
  }
}
