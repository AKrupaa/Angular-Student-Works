import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { EventsService } from 'src/app/core/services/events.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { TicketsService } from 'src/app/core/services/tickets.service';
// import { Account } from '../../../core/models/account';
// import { AccountsService } from '../../../core/services/accounts.service';
// import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.css'],
})
export class AccountsPageComponent implements OnInit {
  loading: boolean;
  accounts: Account[];
  // tickets = []
  constructor(
    private accountService: AccountsService,
    private loginService: LoginService,
    private eventService: EventsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private router: Router,
    private ticketService: TicketsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getAccounts();
    // this.tickets = Array.from(this.accounts.values());
  }

  getAccounts(): void {
    this.accountService
      .getAccounts()
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          return throwError(err);
        })
      )
      .subscribe((acc) => {
        this.accounts = acc;
        this.loading = false;
      });
  }

  editAccount(id: number): void {
    this.sharedService.accountId = id;
    this.router.navigate(['/editAccount']);
  }

  deleteAccount(id: number): void {
    // this.sharedService.accountId = id;
    this.accountService
      .deleteAccount(id)
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          return throwError(err);
        })
      )
      .subscribe((message) => {
        console.log(
          'loginService.account.id= ' +
            this.loginService.account.id +
            ' deleteAccount id = ' +
            id
        );
        if (this.loginService.account.id == id) {
          this.loginService.loggedIn = false;
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/accounts']);
        }
      });
  }
}
