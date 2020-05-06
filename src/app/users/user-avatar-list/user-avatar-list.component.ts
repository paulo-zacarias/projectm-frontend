import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../user';

@Component({
  selector: 'app-user-avatar-list',
  templateUrl: './user-avatar-list.component.html',
  styleUrls: ['./user-avatar-list.component.scss']
})
export class UserAvatarListComponent implements OnInit {

  @Input()listOfUsers: IUser[];

  constructor() { }

  ngOnInit(): void {
  }

}
