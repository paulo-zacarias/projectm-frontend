import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { UserComponent } from './users/user.component';
import { WelcomeComponent } from './home/welcome.component';


const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'users', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
