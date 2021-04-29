import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    name: ['', [Validators.required, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  // onSubmit() {
  //   // console.log('Log in - submit');
  //   // TODO: Use EventEmitter with form value
  //   console.warn(this.loginForm.value);
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   const userToLogin: User = new User();
  //   userToLogin.name = this.loginForm.value.name;
  //   userToLogin.password = this.loginForm.value.password;

  //   this.loginService.login(userToLogin)
  //   .toPromise()
  //     .then(() => {
  //       this.router.navigate(['/dashboard']);
  //     })
  //     .catch(() => {
  //       console.log('Bledne dane logowania');
  //     });
  //   // this.router.navigate(['/dashboard']);
  // }
}
