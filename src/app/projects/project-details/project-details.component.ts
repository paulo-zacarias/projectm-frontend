import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../project';
import { IUser } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { AuthenticationService } from 'src/app/users/auth/authentication.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: IProject;
  admin: IUser;
  participants: IUser[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private userService: UserService,
      private route: ActivatedRoute,
      private authService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data.project;
    this.participants = this.route.snapshot.data.participants;
    this.getAdminDetails(this.project.admin);
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

}
