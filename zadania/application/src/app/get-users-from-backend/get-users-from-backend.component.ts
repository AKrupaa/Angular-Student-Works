import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-get-users-from-backend',
  templateUrl: './get-users-from-backend.component.html',
  styleUrls: ['./get-users-from-backend.component.css'],
})
export class GetUsersFromBackendComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  users: User[];

  getData(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }
}
