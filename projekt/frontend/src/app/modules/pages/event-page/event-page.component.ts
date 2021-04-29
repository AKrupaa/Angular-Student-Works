import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from 'src/app/core/models/event';
import { Ticket } from 'src/app/core/models/ticket';
import { EventsService } from 'src/app/core/services/events.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { TicketsService } from 'src/app/core/services/tickets.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
})
export class EventPageComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private router: Router,
    private ticketService: TicketsService
  ) {}

  eventList: Event[];

  eventForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    howManyTickets: ['', [Validators.required, Validators.minLength(1)]],
    price: ['', [Validators.required, Validators.minLength(1)]],
  });
  // price: number;
  // event: Event;
  // account: Account;

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService
      .getEvents()
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          return throwError(err);
        })
      )
      .subscribe((events) => {
        this.eventList = events;
        // console.log(events);
        // this.toastr.success('get EVENTS component ', 'HAHA');
      });
  }

  buyTicket(id: number) {
    this.sharedService.eventId = id;
    this.router.navigate(['/buyTicket']);
  }

  get getNameForm() {
    return this.eventForm.get('name');
  }

  get getDescriptionForm() {
    return this.eventForm.get('description');
  }

  get getHowManyTickets() {
    return this.eventForm.get('howManyTickets');
  }

  get getPriceForm() {
    return this.eventForm.get('price');
  }

  onSubmit(): void {
    var event = new Event();

    var price = this.eventForm.get('price').value;
    var howManyTickets = this.eventForm.get('howManyTickets').value;

    event.name = this.eventForm.get('name').value;
    event.description = this.eventForm.get('description').value;

    this.eventService
      .addEvent(event)
      .pipe(
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          return throwError(err);
        })
      )
      .subscribe((data: Event) => {
        // console.log(data);
        this.toastr.info('Event created');

        var eventFromDB = new Event();
        eventFromDB = data;
        // console.log(eventFromDB);
        // this.eventList.push(eventFromDB);
        // this.showUpdatedItem(eventFromDB);

        for (let index = 0; index < howManyTickets; index++) {
          var ticket = new Ticket();
          ticket.price = price;
          ticket.taken = false;
          ticket.event = eventFromDB;

          this.ticketService
            .addTicket(ticket)
            .pipe(
              catchError((err: any) => {
                this.toastr.error('ADD TICKET ERROR');
                // var eralert.error('There was an error getting data');
                return throwError(err);
              })
            )
            .subscribe((data: Ticket) => {
              this.eventService
                .getEvents()
                .pipe(
                  catchError((err: any) => {
                    // this.toastr.error('Something went wrong');
                    return throwError(err);
                  })
                )
                .subscribe((data: Event[]) => {
                  this.eventList = data;
                });
            });
        }
        // console.log("Tickets created");
        // this.toastr.success('Tickets created', 'HAHA!');
      });
  }

  deleteEvent(id: number) {
    this.eventService
      .deleteEvent(id)
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          // this.toastr.info("Event is still referenced");
          return throwError(err);
        })
      )
      .subscribe((message) => {
        this.eventService
          .getEvents()
          .pipe(
            catchError((err: any) => {
              // this.toastr.error('Something went wrong');
              return throwError(err);
            })
          )
          .subscribe((events) => {
            // console.log('\n\n');
            // console.log(this.eventList.length + ' ' + events.length);
            // console.log('\n\n');
            if (this.eventList.length == events.length) {
              this.toastr.info('Event is still referenced');
            } else {
              this.toastr.info('Event deleted');
            }

            this.eventList = events;
          });
      });
  }

  private showUpdatedItem(newItem) {
    let updateItem = this.eventList.find(this.findIndexToUpdate, newItem.id);
    let index = this.eventList.indexOf(updateItem);
    this.eventList[index] = newItem;
  }

  private findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
}
