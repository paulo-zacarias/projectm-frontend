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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    NavigationComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
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
