import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  users: IUser[];
  myProject: IUser[] = [];

  @ViewChild('myInput') myInput: ElementRef<HTMLInputElement>;

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

  printFilteredResults() {
    console.log(this.myProject);
    }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.myProject.push(event.option.value);
    this.myInput.nativeElement.value = '';
    this.userListControl.setValue('');
  }

}
