import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService ) {}

  canActivate(
    // ActivatedRouteSnapshot future route that will be activated
    route: ActivatedRouteSnapshot,
    // RouterStateSnapshot contains the future RouterState of the application, should you pass through the guard check.
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    console.log('AuthGuard#canActivate called');
    const url: string = state.url;
    // return false;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    if (this.loginService.loggedIn) {
      return true;
    }
    // return true;

    // // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Redirect to the login page
    this.toastr.warning("Log in, first!");

    return this.router.parseUrl('/login');
  }
}
