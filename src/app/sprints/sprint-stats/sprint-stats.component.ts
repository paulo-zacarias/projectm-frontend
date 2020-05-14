import { Component, OnInit, Input } from '@angular/core';
import { ISprint } from '../sprint';
import { TaskService } from 'src/app/tasks/task.service';
import { ITask } from 'src/app/tasks/Task';

@Component({
  selector: 'app-sprint-stats',
  templateUrl: './sprint-stats.component.html',
  styleUrls: ['./sprint-stats.component.scss']
})
export class SprintStatsComponent implements OnInit {

  @Input()sprint: ISprint;
  sprintTasks: ITask[];

  totalTasksTodo = 0;
  totalTasksInprogress = 0;
  totalTasksDone = 0;

  totalPointsDone  = 0;

  tasksLabels = ['To do', 'In progress', 'Done'];
  burndownLabels = ['Planned', 'Done'];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasksBySprint(this.sprint.id).subscribe(tasks => {
      this.sprintTasks = tasks;
      this.calculateTaskStats();
    });
  }

  calculateTaskStats() {
    this.sprintTasks.map(task => {
      if (task.status === 0) {
        this.totalTasksTodo += 1;
      }
      if (task.status === 1) {
        this.totalTasksInprogress += 1;
      }
      if (task.status === 2) {
        this.totalTasksDone += 1;
        this.totalPointsDone += task.storyPoints;
      }
    });
  }

}
