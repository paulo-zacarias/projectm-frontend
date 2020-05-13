import { Injectable } from '@angular/core';
import { SprintService } from 'src/app/sprints/sprint.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ISprint } from 'src/app/sprints/sprint';

@Injectable({
  providedIn: 'root'
})
export class ProjectSprintsResolver {

  constructor(private sprintService: SprintService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISprint[]> {
    const id = +route.paramMap.get('id');
    return this.sprintService.getSprintsByProject(id);
  }
}
