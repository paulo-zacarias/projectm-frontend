import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { MessageService } from '../../shared/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private auth: AuthenticationService,
    public messageService: MessageService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.messageService.get()
    .subscribe(message => this.snackBar.open(message.text, 'DISMISS', {
      panelClass: [], // Place older for style customization
      verticalPosition: 'top'
    }));

    this.auth.currentUser.subscribe(currentUser => {
      if (currentUser) {
        this.snackBar.dismiss();
        this.router.navigateByUrl('/home');
      }
    });
  }

  login(): void {
    this.auth.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
    );
  }
}
