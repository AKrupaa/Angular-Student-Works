import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';
// import { RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


// const routes: Routes = [
//   // basic routes
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'contacts', component: ContactListComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
