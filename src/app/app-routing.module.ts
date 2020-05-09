import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UserComponent } from './users/user.component';
import { WelcomeComponent } from './home/welcome.component';
import { UserRegisterComponent } from './users/register/user-register.component';
import { UserProfileComponent } from './users/profile/user-profile.component';
import { ProjectComponent } from './projects/project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectResolver } from './projects/resolvers/project-resolver.service';
import { ParticipantsResolver } from './projects/resolvers/participants-resolver.service';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { SprintComponent } from './sprints/sprint.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: '', component: NavigationComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/create-new', component: ProjectCreateComponent },
  {
    path: 'projects/:id/edit',
    component: ProjectEditComponent,
    resolve: {project: ProjectResolver, participants: ParticipantsResolver}
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent,
    resolve: {project: ProjectResolver, participants: ParticipantsResolver}
  },
  { path: 'sprints', component: SprintComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
