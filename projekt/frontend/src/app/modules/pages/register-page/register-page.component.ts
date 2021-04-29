import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // registerFrom = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });
  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get getLoginForm() {
    return this.registerForm.get('login');
  }

  get getPasswordForm() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    var acc = new Account();
    acc.login = this.registerForm.get('login').value;
    acc.password = this.registerForm.get('password').value;
    // this.toastr.success('Welcome', 'Toastr fun!');

    this.registerService
      .register(acc)
      .pipe(
        catchError((err: any) => {
          this.toastr.error('User exists');
          // var eralert.error('There was an error getting data');
          return throwError(err);
        })
      )
      .subscribe((user: Account) => {
        this.toastr.success(
          'Welcome ' + user.login,
          'You have been registered!'
        );

        this.router.navigate(['/home']);
      });
  }
}
