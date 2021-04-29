import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/core/models/account';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {}

  who: string;

  ngOnInit(): void {}

  isLogged(): boolean {
    if (this.loginService.loggedIn) {
      this.who = this.loginService.account.login;
      return true;
    } else return false;
  }

  logout(): void {
    this.loginService.loggedIn=false;
    this.loginService.account = null;
    this.toastr.success("You have been log out");
  }
}
