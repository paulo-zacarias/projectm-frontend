import { Component, OnInit } from '@angular/core';
import { SprintService } from './sprint.service';
import { ISprint } from './sprint';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent implements OnInit {

  constructor(private sprintService: SprintService, public datepipe: DatePipe) { }

  sprints: ISprint[];
  projectSprints: ISprint[];
  sprint: ISprint;

  date: Date = new Date('2020-06-17');

  tasks: number[];


  newSprint = {
    startDate: '2020-06-03',
    endDate: '2020-06-13',
    project: 1,
    tasks: []
};

  ngOnInit(): void {
    this.getAllSprints();
    this.getProjectSprints();
    this.getSprint();
  }

  getAllSprints() {
    this.sprintService.getSprints()
    .subscribe((sprints: ISprint[]) => {
      this.sprints = sprints;
    });
  }

  getProjectSprints() {
    this.sprintService.getSprintsByProject(2)
    .subscribe((sprints: ISprint[]) => {
      this.projectSprints = sprints;
    });
  }

  getSprint() {
    this.sprintService.getSprint(8)
    .subscribe((sprint: ISprint) => {
      this.sprint = sprint;
    });
  }

  createSprint() {
    this.sprintService.addSprint(this.newSprint)
    .subscribe(sprint => this.sprints.push(sprint));
  }

  updateSprint() {
    this.sprint.endDate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.sprintService.updateSprint(8, this.sprint)
    .subscribe(sprint => this.sprint = sprint);
  }

  addTasksToSprint() {
    this.tasks = [1, 2];
    const updatedTasksSprint = {
      tasks: this.tasks
    };

    this.sprintService.updateSprintTasks(8, updatedTasksSprint)
    .subscribe(sprint => this.sprint = sprint);
    console.log(this.sprint);
  }

  deleteSprint() {
    this.sprintService.deleteSprint(9).subscribe();
  }

  printAllSprints() {
    console.log(this.sprints);
  }

  printProjectSprints() {
    console.log(this.projectSprints);
  }

  printOneSprint() {
    console.log(this.sprint);
  }

}
