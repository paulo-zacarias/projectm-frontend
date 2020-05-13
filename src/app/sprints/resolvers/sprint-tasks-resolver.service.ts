import { Injectable } from '@angular/core';
import { TaskService } from 'src/app/tasks/task.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/tasks/Task';

@Injectable({
  providedIn: 'root'
})
export class SprintTasksResolver {

  constructor(private taskService: TaskService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITask[]> {
    const id = +route.paramMap.get('id');
    return this.taskService.getTasksBySprint(id);
  }
}
