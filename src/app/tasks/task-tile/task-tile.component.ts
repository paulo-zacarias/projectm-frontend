import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../Task';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {

  @Input()task: ITask;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(task: ITask) {
    this.dialog.open(TaskDetailsComponent, {
      width: '300px',
      data: task
    });
  }

}
