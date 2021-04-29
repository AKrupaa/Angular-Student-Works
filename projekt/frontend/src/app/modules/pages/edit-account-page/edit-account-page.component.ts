import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-edit-account-page',
  templateUrl: './edit-account-page.component.html',
  styleUrls: ['./edit-account-page.component.css'],
})
export class EditAccountPageComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private router: Router,
    private ticketService: TicketsService,
    private accountService: AccountsService,
    private loginService: LoginService
  ) {}

  account: Account;
  loading: boolean;
  ngOnInit(): void {
    this.loading = true;
    this.getAccount();
  }

  accountForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get getLoginForm() {
    return this.accountForm.get('login');
  }

  get getPasswordForm() {
    return this.accountForm.get('password');
  }

  setLoginForm() {
    this.accountForm.controls['login'].setValue(this.account.login);
  }

  // setNameForm() {
  //   this.accountForm.controls['login'].setValue(this.account.login);
  // }

  getAccount(): void {
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
        this.setLoginForm();
        this.loading = false;
      });
  }

  onSubmit() {
    var password = this.accountForm.get('password').value;
    this.account.password = password;

    this.accountService
      .updateAccount(this.account.id, this.account)
      .pipe(
        catchError((err: any) => {
          // this.toastr.error('get events ERROR');
          return throwError(err);
        })
      )
      .subscribe((acc) => {
        // zaaktualizuj konto
        this.account = acc;
        this.toastr.success("Password changed!");
      });
  }
}
