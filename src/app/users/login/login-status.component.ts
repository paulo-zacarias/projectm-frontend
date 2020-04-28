import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { IUser } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  currentUser: IUser;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user: IUser) => {
      this.currentUser = user;
      console.log('User:', this.currentUser);
    });
  }

  // To be removed after signup component is implemented
  signIn() {
    this.auth.login('ChangePassword666', 'ChangePassword666');
  }

  signOut() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
    // Todo: redirect to some page
  }
}
