import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../user';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Input()selectedUsers;
  @Output() userAdded = new EventEmitter<number>();
  @Output() userRemoved = new EventEmitter<number>();

  users: IUser[];
  removable = true;
  selectable = true;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;

  userListControl = new FormControl();
  filteredUsers: Observable<IUser[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = this.userListControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      });
  }

  private _filter(value: string): IUser[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      if (filterValue === '') {
          return [];
        } else {
        return this.users.filter(user => {
          return user.email.toLowerCase().includes(filterValue);
        });
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value;
    if (this.selectedUsers.indexOf(user) === -1) {
      this.selectedUsers.push(user);
      this.userAdded.emit(user.id);
    }
    this.userInput.nativeElement.value = '';
    this.userListControl.setValue('');
  }

  remove(user: IUser) {
    const index = this.selectedUsers.indexOf(user);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1, );
      this.userRemoved.emit(user.id);
    }
  }

}
