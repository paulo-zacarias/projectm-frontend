import { Component, OnInit } from '@angular/core';
import { IProject } from '../project';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/users/user';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  project: IProject;
  participants: IUser[];

  constructor(
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data.project;
    this.participants = this.route.snapshot.data.participants;
  }

  onProjectFormSaved(project: IProject) {
    this.project = project;

    this.projectService.updateProject(this.project.id, this.project).subscribe(
      updatedProject => {
        console.log(updatedProject);
        this.router.navigateByUrl('/projects/' + updatedProject.id);
      },
      err => console.log = err
    );
  }

}
