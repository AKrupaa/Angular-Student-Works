import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(private http: HttpClient) { }

  getName() {
    return this.http.get('http://localhost:8080/names.json')
    .subscribe(data => {
      console.log("Got ", data);
    })
  }
}
