import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { MessageService } from '../../shared/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, public messageService: MessageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.messageService.get()
    .subscribe(message => this.snackBar.open(message.text, 'DISMISS', {
      panelClass: [], // Place older for style customization
      verticalPosition: 'top'
    }));
    }

  login() {
    this.auth.login('root', 'root');
  }
}
