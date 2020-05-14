import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../Task';
import { ActivatedRoute } from '@angular/router';
import { ISprint } from 'src/app/sprints/sprint';

@Component({
  selector: 'app-tasks-wall',
  templateUrl: './tasks-wall.component.html',
  styleUrls: ['./tasks-wall.component.scss']
})
export class TasksWallComponent implements OnInit {

  tasks: ITask[];
  selectedSprint: ISprint;

  todo = [];
  inprogress = [];
  done = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.tasks = data.tasks;
      this.clearAndFilterTasks();
    });
    this.route.data.subscribe(data => {
      this.selectedSprint = data.sprint;
      this.clearAndFilterTasks();
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Index => ', event.previousIndex);
      console.log('Task => ', event.previousContainer.data[event.previousIndex].title);
      console.log('List => ', event.container.id);
      const task = event.previousContainer.data[event.previousIndex];
      const status = event.container.id;
      this.updateTaskStatus(task, status);
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }

  updateTaskStatus(task: ITask, status: string) {
    switch (status) {
      case 'todo': {
        task.status = 0;
        break;
      }
      case 'inprogress': {
        task.status = 1;
        break;
      }
      case 'done': {
        task.status = 2;
        break;
      }
      default: {
        task.status = 0;
      }
    }
    console.log('Task to update => ', task);
    this.taskService.updateTask(task.id, task).subscribe(
      updatedTask => console.log('Updated task:', updatedTask)
    );
  }

  clearAndFilterTasks() {
    this.todo = [];
    this.inprogress = [];
    this.done = [];
    this.tasks.map(task => {
      if (task.status === 0) {
        this.todo.push(task);
      }
      if (task.status === 1) {
        this.inprogress.push(task);
      }
      if (task.status === 2) {
        this.done.push(task);
      }
    });
    console.log('ToDo: ', this.todo);
    console.log('InProgress: ', this.inprogress);
    console.log('Done: ', this.done);
  }

}
