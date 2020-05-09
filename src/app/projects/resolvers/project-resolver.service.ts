import { Injectable } from '@angular/core';
import { ProjectService } from '../project.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { IProject } from '../project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<IProject> {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
    const id = +route.paramMap.get('id');
    return this.projectService.getProject(id);
  }


}
