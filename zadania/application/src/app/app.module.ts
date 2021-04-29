import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// dla [(ngmodule)]
import { FormsModule } from '@angular/forms';
// HTTP client
import { HttpClientModule } from '@angular/common/http';

// podczas tworzenia (ng generate component nazwa) jest importowany
import { AppComponent } from './main/app.component';
import { HelloComponent } from './hello/hello.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';

// serwisy
import { RecordsService } from './services/records.service';
import { FetchingComponent } from './fetching/fetching.component';
import { NameService } from './services/name.service';
import { GetUsersFromBackendComponent } from './get-users-from-backend/get-users-from-backend.component';

// podczas tworzenia (ng generate component nazwa) jest dodawany do declarations
@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    FibonacciComponent,
    FetchingComponent,
    GetUsersFromBackendComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [RecordsService, NameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
