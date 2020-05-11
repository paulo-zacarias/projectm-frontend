import { Component, OnInit } from '@angular/core';
import { ITask, Status } from './Task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: ITask[];
  task: ITask;

  Status = Status;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getTask();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks
    );
  }

  getTask() {
    this.taskService.getTask(1).subscribe(
      task => this.task = task
    );
  }

  printAllTasks() {
    console.log(this.tasks);
  }

  printTask() {
    console.log(this.task);
  }

  completeTask() {
    this.task.status = 2;
  }


}
