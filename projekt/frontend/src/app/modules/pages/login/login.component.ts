import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // account: Account = new Account();

  // name = new FormControl('');

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // this.account = new Account();
  }

  profileForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    //   this.account = new FormGroup({
    //     name: new FormControl(this.hero.name, [
    //       Validators.required,
    //       Validators.minLength(4),
    //       forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
    //     ]),
    //     alterEgo: new FormControl(this.hero.alterEgo),
    //     power: new FormControl(this.hero.power, Validators.required)
    //   });
  }

  get getLoginForm() {
    return this.profileForm.get('login');
  }

  get getPasswordForm() {
    return this.profileForm.get('password');
  }

  onSubmit() {
    var acc = new Account();
    acc.login = this.profileForm.get('login').value;
    acc.password = this.profileForm.get('password').value;
    this.loginService
      .login(acc)
      .pipe(
        catchError((err: any) => {
          this.toastr.error('Something went wrong');
          // var eralert.error('There was an error getting data');
          return throwError(err);
        })
      )
      .subscribe((data: Account) => {
        // console.log(data);
        this.loginService.account = data;
        this.loginService.loggedIn = true;

        this.toastr.success('Welcome ' + acc.login, 'You have been logged in!');
        // console.log(this.loginService.account.id);
        this.router.navigate(['/home']);

        // this.loginService.account.id = data.id;
        // this.loginService.account.login = data.login;
        // this.loginService.account.password = data.password;

        // var some: Account = data;
        // some
        // console.log(some.id);
        // data = JSON.parse(data);
        // console.log(data);
        // console.log(some.);
        // console.log(
        // 'ID: ' +
        // data.id +
        // 'Login ' +
        // data.login +
        // 'Password ' +
        // data.password
        // );
      });
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.value);

    // TODO: add service -> check user -> update user
    // if so go to home
  }
}
