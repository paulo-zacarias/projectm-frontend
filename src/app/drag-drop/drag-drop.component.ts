import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../tasks/task.service';
import { map } from 'rxjs/operators';
import { ITask } from '../tasks/Task';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {



  todo = [];

  inprogress = [];

  done = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchAndFilterTasks();
  }


  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // inprogress = [
  //   'Get something done',
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];

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
      // const task = event.previousContainer.data[event.previousIndex];
      // const status = event.container.id;
      // this.updateTaskStatus(task, status);
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

  fetchAndFilterTasks() {
    this.taskService.getTasksByProject(1).subscribe(
      tasks => tasks.map(task => {
        if (task.status === 0) {
          this.todo.push(task);
        }
        if (task.status === 1) {
          this.inprogress.push(task);
        }
        if (task.status === 2) {
          this.done.push(task);
        }
      })
    );
    console.log('ToDo: ', this.todo);
    console.log('InProgress: ', this.inprogress);
    console.log('Done: ', this.done);
  }
}
