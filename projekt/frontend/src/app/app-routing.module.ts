import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AccountsPageComponent } from './modules/pages/accounts-page/accounts-page.component';
import { LoginGuardGuard } from './core/guards/login-guard.guard';
import { AccountsPageComponent } from './modules/pages/accounts-page/accounts-page.component';
import { BuyTicketComponent } from './modules/pages/buy-ticket/buy-ticket.component';
import { EditAccountPageComponent } from './modules/pages/edit-account-page/edit-account-page.component';
import { EventPageComponent } from './modules/pages/event-page/event-page.component';
import { LandingPageComponent } from './modules/pages/landing-page/landing-page.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { LogoutComponent } from './modules/pages/logout/logout.component';
import { RegisterPageComponent } from './modules/pages/register-page/register-page.component';
import { TicketPageComponent } from './modules/pages/ticket-page/ticket-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    // data: { requiresLogin: true },
    // call the GUARD to protect area
    // canActivate: [LoginGuardGuard],
  },
  {
    path: 'home',
    component: LandingPageComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  { path: 'signUp', component: RegisterPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'accounts',
    component: AccountsPageComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'events',
    component: EventPageComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'tickets',
    component: TicketPageComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'buyTicket',
    component: BuyTicketComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'editAccount',
    component: EditAccountPageComponent,
    data: { requiresLogin: true },
    // call the GUARD to protect area
    canActivate: [LoginGuardGuard],
  },
  { path: '**', redirectTo: '/home' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
