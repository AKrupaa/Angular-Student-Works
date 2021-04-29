import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  account : Account = new Account();
  loggedIn: boolean;

  login(account: Account) {
    // console.log(account.login + " " + account.password);
    // return this.http.post(`${environment.backendUrl}`+"/accounts/"+account.login.trim()+"/"+accoun t.password.trim(), null);
    return this.http.post(`http://localhost:8080/accounts/`+account.login+`/`+account.password, null);
  }


  // public checkLoginStatus(): any {
  //   const status = new Observable((observer) => {
  //     // code
  //     this.authService.authState.subscribe((user) => {
  //       this.user = user;
  //       this.loggedIn = user != null;
  //       observer.next(true);
  //       observer.complete();
  //       // return {unsubscribe() {}};
  //     });
  //   });

  //   return status;
  // }
}
