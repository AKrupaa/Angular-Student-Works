import { Component, OnInit } from '@angular/core';
import { STUDENTS } from '../mocks/students';
import { Student } from '../student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students = STUDENTS;
  text : string = '';
  constructor() {}

  ngOnInit(): void {}

  pressedButton = false;

  myStyles = {
    backgroundColor: 'white',
    color: 'maroon'
  }

  oddStyle = {
    color: 'red'
  }

  onClick() {
    this.pressedButton = !this.pressedButton;
  }

  onClick123(){
    this.text  = " ja pierdole ";
  }

  onKeyUpEnter(v: string) {
    this.students.push({ id: this.students.length+1, name: v });
  }

  onMouseOver() {
    this.myStyles.backgroundColor = 'ivory';
  }

  onMouseOut() {
    this.myStyles.backgroundColor = 'white';
  }

  onDragEnd(student: Student) {
    console.log("you dragged " + student.name);
  }

}
