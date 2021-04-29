import { Injectable } from '@angular/core';
import { RecordsMock } from '../mocks/records-mock';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor() { }

  getMockData() {
    return RecordsMock.getData();
  }
}
