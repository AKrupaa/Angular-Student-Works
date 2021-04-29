import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  myVariable = 123
  text = "app"

  constructor() { }

  ngOnInit(): void {
  }

  callMyFunction() {
    console.log("Function called");
    this.myVariable = this.myVariable + 1;
  }

  // updateValue(e) {
  //   this.text = e.target.value
  //   console.log(e.target.value)
  // }
}
