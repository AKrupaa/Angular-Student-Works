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

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.css'],
})
export class TicketPageComponent implements OnInit {
  constructor(
    private ticketService: TicketsService,
    private eventService: EventsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private router: Router,
    private accountService: AccountsService,
    private loginService: LoginService
  ) {}

  account: Account;
  loading: boolean;
  totalCosts: number;

  ngOnInit(): void {
    this.totalCosts = 0;
    this.loading = true;
    this.getNecessaryData();
  }

  getNecessaryData(): void {
    this.accountService
      .getAccount(this.loginService.account.id)
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          return throwError(err);
        })
      )
      .subscribe((acc) => {
        this.account = acc;
        this.loading = false;

        this.account.tickets.forEach(ticket => {
          this.totalCosts += ticket.price;
        });
      });
  }
}
