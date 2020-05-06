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
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { UserAvatarListComponent } from './users/user-avatar-list/user-avatar-list.component';

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
    UserAvatarListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
