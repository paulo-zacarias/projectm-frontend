import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../project';
import { IUser } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { AuthenticationService } from 'src/app/users/auth/authentication.service';
import { ISprint } from 'src/app/sprints/sprint';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: IProject;
  admin: IUser;
  participants: IUser[];
  sprints: ISprint[];
  currentSprint: ISprint;

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data.project;
    this.participants = this.route.snapshot.data.participants;
    this.sprints = this.route.snapshot.data.sprints;
    this.getAdminDetails(this.project.admin);
    this.getCurrentSprint();
  }



  getAdminDetails(adminUserId: number) {
    this.userService.getUser(adminUserId)
      .subscribe((admin: IUser) => this.admin = admin);
  }

  isProjectAdmin() {
    if (this.admin) {
      return this.authService.currentUserDetails.id === this.admin.id;
    }
  }

  getCurrentSprint() {
    const currentDate = Date.now();
    this.currentSprint = this.sprints.find(sprint => {
      if (Date.parse(sprint.startDate) <= currentDate) {
        if (Date.parse(sprint.endDate) >= currentDate) {
          return sprint;
        }
      }
    });
    // If there is no current sprint, assigns the newest sprint from the sprint array
    if (this.currentSprint === undefined) {
      this.currentSprint = this.sprints[0];
    }
  }
}
