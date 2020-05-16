import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { MessageService } from 'src/app/shared/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/users/auth/authentication.service';
import { IUser } from 'src/app/users/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../Task';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  @Input()project: number;
  @Input()sprint: number;
  @Output()addedTask = new EventEmitter<ITask>();
  @Output()discarded = new EventEmitter<any>();

  taskForm: FormGroup;
  user: IUser;
  selected = 1;

  constructor(
    private taskService: TaskService,
    public messageService: MessageService,
    private authService: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserDetails;
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      storyPoints: ['', [Validators.required, Validators.min(1)]],
    });

  }

  submitTaskForm() {
    if (this.taskForm.valid && this.taskForm.touched) {
      const task = {
        title: this.taskForm.get('title').value,
        description: this.taskForm.get('description').value,
        storyPoints: this.taskForm.get('storyPoints').value,
        weight: this.selected,
        status: 0,
        project: this.project,
        assignedPerson: this.user
      };

      this.taskService.addTask(task).subscribe(newTask => {
        this.addedTask.emit(newTask);
      });
    }
  }

  discard(){
    this.discarded.emit();
  }
}
