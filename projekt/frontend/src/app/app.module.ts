import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/components/footer/footer.component';
import { LandingPageComponent } from './modules/pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './modules/pages/register-page/register-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { LogoutComponent } from './modules/pages/logout/logout.component';
import { TicketPageComponent } from './modules/pages/ticket-page/ticket-page.component';
import { EventPageComponent } from './modules/pages/event-page/event-page.component';
// import { AccountsPageComponent } from './modules/pages/accounts-page/accounts-page.component';
import {FormsModule} from '@angular/forms';
import { BuyTicketComponent } from './modules/pages/buy-ticket/buy-ticket.component';
import { AccountsPageComponent } from './modules/pages/accounts-page/accounts-page.component';
import { EditAccountPageComponent } from './modules/pages/edit-account-page/edit-account-page.component';
// import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
// import { EditAccountPageComponent } from './edit-account-page/edit-account-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FooterComponent,
    RegisterPageComponent,
    LoginComponent,
    NavbarComponent,
    LogoutComponent,
    EventPageComponent,
    TicketPageComponent,
    AccountsPageComponent,
    BuyTicketComponent,
    EditAccountPageComponent
    // EditUserPageComponent,
    // EditAccountPageComponent,
    // AccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
