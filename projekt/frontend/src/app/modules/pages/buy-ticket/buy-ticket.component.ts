import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account';
import { Event } from 'src/app/core/models/event';
import { Ticket } from 'src/app/core/models/ticket';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { EventsService } from 'src/app/core/services/events.service';
import { LoginService } from 'src/app/core/services/login.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { TicketsService } from 'src/app/core/services/tickets.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
})
export class BuyTicketComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private router: Router,
    private ticketService: TicketsService,
    private loginService: LoginService,
    private accountService: AccountsService
  ) {}

  account: Account;
  event: Event;
  tickets: Ticket[];
  price: number;
  private test: boolean = false;
  public loading0: boolean = true;
  public loading1: boolean = true;
  public loading2: boolean = true;

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.ticketService
      .getTicketWhereEvent(this.sharedService.eventId)
      .pipe(
        catchError((err: any) => {
          this.toastr.error('buy-ticket-component getTicketWhereEvent ERROR');
          return throwError(err);
        })
      )
      .subscribe((tickets) => {
        this.tickets = tickets;
        // console.log(tickets);
        this.loading0 = false;

        if (tickets.length) this.price = tickets[0].price;
        else this.price = 0;
      });

    this.eventService
      .getEvent(this.sharedService.eventId)
      .pipe(
        catchError((err: any) => {
          this.toastr.error('buy-ticket-component getEvent ERROR');
          return throwError(err);
        })
      )
      .subscribe((event) => {
        this.event = event;
        // console.log(event);
        // this.sharedService.eventId = null;
        this.loading1 = false;
      });

    this.accountService
      .getAccount(this.loginService.account.id)
      .pipe(
        catchError((err: any) => {
          this.toastr.error(
            'buy-ticket-component buy accountService.getAccount ERROR'
          );
          return throwError(err);
        })
      )
      .subscribe((acc) => {
        this.account = acc;
        this.loading2 = false;
      });
  }

  checkIfParticipateInEvent() {
    this.account.tickets.forEach((ticket) => {
      // console.log(
      //   'ticket event id ' + ticket.event.id + ' event id ' + this.event.id
      // );
      if (ticket.event.id == this.event.id) {
        // this.toastr.show("Ticket id: " + ticket.id + " event id: " + this.event.id);
        this.test = true;
      }
    });

    // this.test = false;
  }

  buy() {
    // var ticket = this.tickets.pop();
    // var account = this.loginService.account.id;
    // var account : Account;
    // this.checkIfParticipateInEvent();
    this.checkIfParticipateInEvent();
    if (this.test == true) {
      this.toastr.error('Are you sure about that?');
      // console.log("a tutaj BLAD BLAD BLAD");
      return;
    }
    // this.toastr.error("NO KURWA NIE DZIALA");

    // console.log("PRZESZLO");

    this.accountService
      .getAccount(this.loginService.account.id)
      .pipe(
        catchError((err: any) => {
          this.toastr.error(
            'buy-ticket-component buy accountService.getAccount ERROR'
          );
          return throwError(err);
        })
      )
      .subscribe((acc) => {
        // account = acc;
        // console.log(acc);

        var ticket = this.tickets.pop();
        ticket.taken = true;

        this.ticketService
          .updateTicket(ticket.id, ticket)
          .pipe(
            catchError((err: any) => {
              this.toastr.error(
                'buy-ticket-component buy accountService.getAccount ticketService.updateTicket ERROR'
              );
              return throwError(err);
            })
          )
          .subscribe((fetchedTicket) => {
            acc.tickets.push(fetchedTicket);

            this.accountService
              .updateAccount(acc.id, acc)
              .pipe(
                catchError((err: any) => {
                  this.toastr.error(
                    'buy-ticket-component buy accountService.getAccount accountService.updateAccount ERROR'
                  );
                  return throwError(err);
                })
              )
              .subscribe((againFetchedAcc) => {
                // console.log("\n\n\n\n\n" + againFetchedAcc);
                this.toastr.success('You bought a ticket', 'Have fun!');
                this.router.navigate(['/tickets']);
              });
          });
      });
  }
}
