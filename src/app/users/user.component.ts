import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from './user';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];
  user: IUser;
  id = 15;

  newUser = {
    username: 'httpTest',
    email: '',
    firstName: 'http',
    lastName: 'User'
  };

  constructor(private userService: UserService, private auth: AuthenticationService) { }

  getAllUsers() {
    this.userService.getUsers()
    .subscribe((users: IUser[]) => {
      this.users = users;
    });
  }

  getOneUser() {
    this.userService.getUser(1)
    .subscribe((user: IUser) => {
      this.user = user;
    });
  }

  printAllUsers() {
    for (const user of this.users) {
      console.log(user);
      console.log(user.firstName);
      console.log(user.profile.displayName);
    }
  }

  printOneUser() {
    console.log(this.user);
    console.log(this.user.profile.image);
  }

  addUser() {
    this.userService.addUser(this.newUser)
    .subscribe(user => this.users.push(user));
  }

  deleteUser() {
    this.userService.deleteUser(this.id)
    // .subscribe();
    .subscribe(user => this.users.splice(this.users.indexOf(user), 1));
  }

  updateUser() {
    this.users[3].email = '';
    this.userService.updateUser(this.id, this.users[3])
    // .subscribe();
    // .subscribe(user => this.users[this.users.indexOf(user)] = user);
    .subscribe(user => this.users.splice(this.users.indexOf(user), 1, user));
  }

  login() {
    this.auth.login('root', 'root0');
  }

  logout() {
    this.auth.logout();
  }

  showCurrentUser() {
    console.log(this.auth.currentUser);
  }

  isLoggedIn() {
    console.log(this.auth.isLoggedIn);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getOneUser();
  }
}
