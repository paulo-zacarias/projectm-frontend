import { Component, OnInit } from '@angular/core';
import { ISprint } from './sprint';
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
  viewEditSprint = false;

  constructor(
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

  enableCreateButton() {
    this.viewCreateSprint = true;
  }

  enableEditButton() {
    this.viewEditSprint = true;
  }

  disableButtons() {
    this.viewCreateSprint = false;
    this.viewEditSprint = false;
  }

  showActionsMenu() {
    const isUserProjectAdmin = this.authService.currentUserDetails.id === this.project.admin;
    return isUserProjectAdmin && !this.viewCreateSprint && !this.viewEditSprint;
  }

  onSprintAdded(newSprint: ISprint) {
    this.sprints.splice(0, 1, newSprint);
    this.selectedSprint = newSprint;
    this.viewCreateSprint = false;
    this.router.navigateByUrl('/projects/' + newSprint.project + '/sprints/' + newSprint.id);
  }

  onSprintSaved(savedSprint: ISprint) {
    const index = this.sprints.indexOf(this.selectedSprint);
    this.sprints.splice(index, 1, savedSprint);
    this.selectedSprint = savedSprint;
    this.viewEditSprint = false;

  }

}
