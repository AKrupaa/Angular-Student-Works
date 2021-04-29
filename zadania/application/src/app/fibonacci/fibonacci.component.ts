import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css'],
})
export class FibonacciComponent implements OnInit {
  inputFibonacii = 0;
  fibonacci = 0;

  constructor() {}

  ngOnInit(): void {}

  calculateFibonacii(input) {
    if (input == 0) {
      //this.fibonacci = 0
      return 0;
    } else if (input == 1)
      //this.fibonacci = 1;
      return 1;
    else {
      this.fibonacci =
        this.calculateFibonacii(input - 1) + this.calculateFibonacii(input - 2);
    }
    return this.fibonacci;
  }
}
