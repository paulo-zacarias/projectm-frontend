import { Component, OnInit } from '@angular/core';
import { ISprint } from './sprint';
import { SprintService } from './sprint.service';
import { MatSelectChange } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../users/auth/authentication.service';
import { IProject } from '../projects/project';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  sprints: ISprint[];
  project: IProject;
  selectedSprintId: number;
  selectedSprint: ISprint;
  viewCreateSprint = false;

  constructor(
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.project = this.route.snapshot.data.project;
    this.sprints = this.route.snapshot.data.sprints;
    // Workaround to get selected sprint from child component/route:
    const selectedSprintId = +this.route.firstChild.snapshot.paramMap.get('id');
    this.selectedSprint = this.sprints.find(sprint => sprint.id === selectedSprintId);
  }

  selected(event: MatSelectChange): void {
    const sprint: ISprint = event.value;
    this.router.navigateByUrl('/projects/' + sprint.project + '/sprints/' + sprint.id);
  }

  showCreateSprint() {
    this.viewCreateSprint = !this.viewCreateSprint;
  }

  allowCreateSprint() {
    return !this.viewCreateSprint && this.authService.currentUserDetails.id === this.project.admin;
  }

}
