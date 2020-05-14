import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStatsComponent } from './sprint-stats.component';

describe('SprintStatsComponent', () => {
  let component: SprintStatsComponent;
  let fixture: ComponentFixture<SprintStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
