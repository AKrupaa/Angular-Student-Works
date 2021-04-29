import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from '../models/account';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient, private router: Router) {}

  private accountUrl = 'http://localhost:8080/accounts';
  // events = [];

  // loggedIn: boolean;
  /** GET events from the server */
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl).pipe(
      map((response: any) => {
        // let data = response.json();
        // console.log(data);
        var costam = response["_embedded"];
        var cos = costam["accountList"];
        // const pagination = response;
        return cos;
      })
    );
  }

  /** GET event by id. Will 404 if id not found */
  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url).pipe(
      tap((_) => this.log(`fetched account id=${id}`)),
      catchError(this.handleError<Account>(`getAccount id=${id}`))
    );
  }

  /** PUT: update the event on the server */
  updateAccount(id: number, account: Account): Observable<any> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.put(url, account, httpOptions).pipe(
      tap((_) => this.log(`updated account id=${account.id}`)),
      catchError(this.handleError<any>("updateAccount"))
    );
  }

  /** PUT: update the collection of events on the server */
  updateAccounts(accounts: Account[]): Observable<any> {
    return this.http.put(this.accountUrl, accounts, httpOptions).pipe(
      tap((_) => this.log(`updated accounts:\n ${accounts}`)),
      catchError(this.handleError<any>("updateAccounts"))
    );
  }

  /** PATCH: Update the addressed member of the collection. */
  patchAccount(id: number, account: Account): Observable<any> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.patch(url, account, httpOptions).pipe(
      tap((_) => this.log(`updated account id=${account.id}`)),
      catchError(this.handleError<any>("patchAccount"))
    );
  }

  /** POST: add a new event to the server */
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions).pipe(
      tap((accountAdded: Account) =>
        this.log(`added account id=${accountAdded.id}`)
      ),
      catchError(this.handleError<Account>("addAccount"))
    );
  }

  /** DELETE: delete the event from the server */
  deleteAccount(account: Account | number): Observable<Account> {
    const id = typeof account === "number" ? account : account.id;
    const url = `${this.accountUrl}/${id}`;
    return this.http.delete<Account>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted account id=${id}`)),
      catchError(this.handleError<Account>("deleteAccount"))
    );
  }

  /** DELETE: Delete the entire collection. */
  deleteAccounts(): Observable<any> {
    return this.http.delete(this.accountUrl, httpOptions).pipe(
      tap((_) => this.log(`All accounts deleted with status: ${_}`)),
      catchError(this.handleError<any>("deleteAccounts"))
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
    console.log('AccountService: ' + message);
  }
}
