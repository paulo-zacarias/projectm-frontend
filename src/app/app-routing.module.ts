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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectSprintsResolver } from './projects/resolvers/project-sprints-resolver.service';
import { TaskComponent } from './tasks/task.component';
import { SprintResolver } from './sprints/resolvers/sprint-resolver.service';
import { SprintTasksResolver } from './sprints/resolvers/sprint-tasks-resolver.service';
import { SprintCreateComponent } from './sprints/sprint-create/sprint-create.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TaskTileComponent } from './tasks/task-tile/task-tile.component';
import { TasksWallComponent } from './tasks/tasks-wall/tasks-wall.component';

const routes: Routes = [
  { path: '', component: SprintComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'projects', component: NavigationComponent,
    children: [
      { path: '', component: ProjectComponent },
      { path: 'create-new', component: ProjectCreateComponent },
      {
        path: ':id/edit',
        component: ProjectEditComponent,
        resolve: {project: ProjectResolver, participants: ParticipantsResolver }
      },
      { path: ':id/sprints', component: SprintComponent, resolve: {project: ProjectResolver, sprints: ProjectSprintsResolver },
        children: [
        { path: ':id', component: TasksWallComponent, resolve: {sprint: SprintResolver, tasks: SprintTasksResolver}}
      ]},
      // { path: ':id/sprints/:id', component: SprintComponent,
      //   resolve: {sprint: SprintResolver, tasks: SprintTasksResolver},
      // },
      {
        path: ':id',
        component: ProjectDetailsComponent,
        resolve: {project: ProjectResolver, participants: ParticipantsResolver, sprints: ProjectSprintsResolver}
      },
    ]
  },
  { path: 'sprint-new', component: SprintCreateComponent},
  // { path: 'sprints', component: SprintComponent},
  // { path: 'sprints/:id', component: SprintComponent},
  { path: 'tasks', component: TaskComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
