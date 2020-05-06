import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { IProject } from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: IProject[] = [];
  project: IProject;


  newProject = {
    name: 'TestFrontendProject',
    description: 'Project to test frontend service',
    participants: [
        'http://127.0.0.1:8000/users/1/',
        'http://127.0.0.1:8000/users/12/',
        'http://127.0.0.1:8000/users/19/'
    ]
  };

  constructor(private projectService: ProjectService) { }

  getAllProjects() {
    this.projectService.getProjects()
    .subscribe((projects: IProject[]) => {
      this.projects = projects;
    });
  }

  addProject() {
    this.projectService.addProject(this.newProject)
    .subscribe(project => this.projects.push(project));
  }

  printAllProjects() {
    for (const project of this.projects) {
      console.log(project);
    }
  }

  getOneProject() {
    this.projectService.getProject(10)
    .subscribe((project: IProject) => {
      this.project = project;
    });
  }

  printOneProject() {
    console.log(this.project);
  }

  ngOnInit(): void {
    this.getAllProjects();
    // this.getOneProject();
  }

  deleteProject() {
    this.projectService.deleteProject(9)
    // .subscribe();
    .subscribe(project => this.projects.splice(this.projects.indexOf(project), 1));
  }

  updateProject() {
    this.projects[0].description = 'Project to test permissions';
    this.projectService.updateProject(1, this.projects[0])
    .subscribe(project => this.projects.splice(this.projects.indexOf(project), 1, project));
  }

}
