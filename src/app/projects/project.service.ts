import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { IProject } from './project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

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
      catchError(this.handleError)
    );
  }

  getProject(id: number): Observable<IProject> {
    return this.http.get<IProject>(this.projectsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  addProject(project: any): Observable<IProject> {
    return this.http.post<IProject>(this.projectsUrl, project, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateProject(id: number, project: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.projectsUrl + id + '/', project, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  deleteProject(id: number): Observable<IProject> {
    return this.http.delete<IProject>(this.projectsUrl + id + '/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
