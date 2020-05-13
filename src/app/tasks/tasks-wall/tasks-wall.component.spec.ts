import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksWallComponent } from './tasks-wall.component';

describe('TasksWallComponent', () => {
  let component: TasksWallComponent;
  let fixture: ComponentFixture<TasksWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
