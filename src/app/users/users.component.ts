import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
	users: User[] = [];

	  constructor(private userService: UserService) {}

	  ngOnInit(): void {
	    this.userService.getUsers().subscribe(data => {
	      this.users = data;
	    });
	  }
}
