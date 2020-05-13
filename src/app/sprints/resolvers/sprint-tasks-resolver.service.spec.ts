import { TestBed } from '@angular/core/testing';

import { SprintTasksResolver } from './sprint-tasks-resolver.service';

describe('SprintTasksResolver', () => {
  let service: SprintTasksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintTasksResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
