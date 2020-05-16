import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../Task';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {

  @Input()task: ITask;

  constructor() { }

  ngOnInit(): void {
  }
}
