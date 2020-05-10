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
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './users/profile/user-profile.component';
import { SearchUserComponent } from './users/search-user/search-user.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { UserAvatarListComponent } from './users/user-avatar-list/user-avatar-list.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { SprintComponent } from './sprints/sprint.component';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

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
    DashboardComponent,
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
    LayoutModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
