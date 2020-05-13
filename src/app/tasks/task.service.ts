import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { httpOptions, handleError } from '../shared/http-common';

import { ITask } from './Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = environment.API_URL + '/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getTasksByProject(projectId: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl + '?project_id=' + projectId)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getTasksBySprint(sprintId: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl + '?sprint_id=' + sprintId)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getTasksByProjectParticipant(projectId: number, userId: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl + '?project_id=' + projectId + '&' + 'user_id=' + userId)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(this.tasksUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  addTask(task: any): Observable<ITask> {
    return this.http.post<ITask>(this.tasksUrl, task, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  updateTask(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(this.tasksUrl + id + '/', task, httpOptions)
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }

  // updateSprintTasks(id: number, tasks: any): Observable<ITask> {
  //   return this.http.patch<ITask>(this.tasksUrl + id + '/', tasks, httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(handleError)
  //   );
  // }

  deleteTask(id: number): Observable<ITask> {
    return this.http.delete<ITask>(this.tasksUrl + id + '/')
    .pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
