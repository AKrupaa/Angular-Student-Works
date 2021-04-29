import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  eventId : number;
  accountId : number;

}
