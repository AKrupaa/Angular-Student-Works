import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {

  @Input() name: string; // <-- added Input annotation

  // name: string; // <-- added name property
  names: string[] = ['Ahri', 'Carlos', 'Filipe', 'Nate'];

  constructor() {
    // this.name = 'Felipe'; // set the name
  }

  ngOnInit(): void {}
}
