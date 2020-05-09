import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProject } from '../project';
import { IUser } from 'src/app/users/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input()project: IProject;
  @Input()participants: IUser[];
  @Output() projectFormSaved = new EventEmitter<any>();

  projectForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: [this.project.name, [Validators.required, Validators.maxLength(50)]],
      projectDescription: [this.project.description, [Validators.required, Validators.maxLength(250)]],
    });
  }

  submitProjectForm() {
    if (this.projectForm.valid && this.projectForm.touched) {
      this.project.name = this.projectForm.get('projectName').value;
      this.project.description = this.projectForm.get('projectDescription').value;
      this.projectFormSaved.emit(this.project);
    }
  }

  onUserAdded(userId: number) {
    this.projectForm.markAsDirty();
    const index = this.project.participants.indexOf(userId);
    if (index === -1) {
      this.project.participants.push(userId);
    }
  }

  onUserRemoved(userId: number) {
    this.projectForm.markAsDirty();
    const index = this.project.participants.indexOf(userId);
    if (index !== -1) {
      this.project.participants.splice(index, 1, );
    }
  }

}
