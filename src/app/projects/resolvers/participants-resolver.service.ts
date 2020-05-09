import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUser } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsResolver implements Resolve<IUser[]> {

  constructor(private usersService: UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> {
    const id = +route.paramMap.get('id');
    return this.usersService.getProjectParticipants(id);
  }
}
