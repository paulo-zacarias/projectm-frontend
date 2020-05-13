import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { httpOptions, handleError } from '../shared/http-common';

import { IProject } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = environment.API_URL + '/projects/';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectsUrl)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getProject(id: number): Observable<IProject> {
    return this.http.get<IProject>(this.projectsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  addProject(project: any): Observable<IProject> {
    return this.http.post<IProject>(this.projectsUrl, project, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateProject(id: number, project: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.projectsUrl + id + '/', project, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  deleteProject(id: number): Observable<IProject> {
    return this.http.delete<IProject>(this.projectsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

}
