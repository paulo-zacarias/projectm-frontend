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

  selectedValue: Food;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selected(event: MatSelectChange): void {
    const selValue: Food = event.value;
    console.log('Selected value: ', selValue.value);
    console.log('Selected viewValue: ', selValue.viewValue);

  }

}
