import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: string[] = [];
  newUserName: string = ''; 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
    });
  }

  addUser(): void {
    if (this.newUserName.trim()) {
      this.userService.addUser(this.newUserName.trim());
      this.newUserName = ''; 
    }
  }

  deleteUser(name: string): void {
    this.userService.removeUser(name);
  }
}
