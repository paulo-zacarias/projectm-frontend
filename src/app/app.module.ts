import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthInterceptor } from './auth/auth-interceptor';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './users/user.component';
import { ProjectComponent } from './projects/project.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './users/login/login.component';
import { LoginStatusComponent } from './users/login/login-status.component';
import { WelcomeComponent } from './home/welcome.component';
import { UserRegisterComponent } from './users/register/user-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProfileComponent } from './users/profile/user-profile.component';
import { SearchUserComponent } from './users/search-user/search-user.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { UserAvatarListComponent } from './users/user-avatar-list/user-avatar-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { SprintComponent } from './sprints/sprint.component';
import { DatePipe } from '@angular/common';
import { TaskComponent } from './tasks/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SprintCreateComponent } from './sprints/sprint-create/sprint-create.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskTileComponent } from './tasks/task-tile/task-tile.component';
import { TasksWallComponent } from './tasks/tasks-wall/tasks-wall.component';
import { SprintStatsComponent } from './sprints/sprint-stats/sprint-stats.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './sprints/doughnut-chart/doughnut-chart.component';
import { SprintEditComponent } from './sprints/sprint-edit/sprint-edit.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { StatusPipe } from './shared/status.pipe';
import { WeightPipe } from './shared/weight.pipe';
import { UploadPictureComponent } from './users/upload-picture/upload-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    NavigationComponent,
    LoginComponent,
    LoginStatusComponent,
    WelcomeComponent,
    UserRegisterComponent,
    UserProfileComponent,
    ProjectDetailsComponent,
    SearchUserComponent,
    UserAvatarListComponent,
    ProjectCreateComponent,
    ProjectFormComponent,
    ProjectEditComponent,
    SprintComponent,
    TaskComponent,
    DashboardComponent,
    SprintCreateComponent,
    DragDropComponent,
    TaskTileComponent,
    TasksWallComponent,
    SprintStatsComponent,
    DoughnutChartComponent,
    SprintEditComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskDetailsComponent,
    StatusPipe,
    WeightPipe,
    UploadPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    DragDropModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
