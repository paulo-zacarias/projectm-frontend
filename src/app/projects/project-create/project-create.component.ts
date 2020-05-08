import { Component, OnInit } from '@angular/core';
import { IProject } from '../project';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  project: IProject = {
    id: 0,
    name: '',
    description: '',
    admin: 0,
    participants: []
  };

  constructor(
    private projectService: ProjectService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onProjectFormSaved(project: IProject) {
    const newProject = {
      name: project.name,
      description: project.description,
      participants: project.participants
    };
    this.projectService.addProject(newProject).subscribe(
      addedProject => {
        console.log(addedProject);
        this.router.navigateByUrl('/projects/' + addedProject.id);
      },
      err => console.log = err
    );
  }

}
