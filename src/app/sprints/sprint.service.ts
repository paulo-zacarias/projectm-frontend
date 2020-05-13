import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { httpOptions, handleError } from '../shared/http-common';

import { ISprint } from './sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private sprintsUrl = environment.API_URL + '/sprints/';

  constructor(private http: HttpClient) { }

  getSprints(): Observable<ISprint[]> {
    return this.http.get<ISprint[]>(this.sprintsUrl)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getSprintsByProject(projectId: number): Observable<ISprint[]> {
    return this.http.get<ISprint[]>(this.sprintsUrl + '?project_id=' + projectId)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getSprint(id: number): Observable<ISprint> {
    return this.http.get<ISprint>(this.sprintsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  addSprint(sprint: any): Observable<ISprint> {
    return this.http.post<ISprint>(this.sprintsUrl, sprint, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateSprint(id: number, sprint: ISprint): Observable<ISprint> {
    return this.http.put<ISprint>(this.sprintsUrl + id + '/', sprint, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateSprintTasks(id: number, tasks: any): Observable<ISprint> {
    return this.http.patch<ISprint>(this.sprintsUrl + id + '/', tasks, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  deleteSprint(id: number): Observable<ISprint> {
    return this.http.delete<ISprint>(this.sprintsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
