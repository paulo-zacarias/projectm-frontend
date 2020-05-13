import { Injectable } from '@angular/core';
import { SprintService } from '../sprint.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ISprint } from '../sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintResolver {

  constructor(private sprintService: SprintService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISprint> {
    const id = +route.paramMap.get('id');
    return this.sprintService.getSprint(id);
  }
}
