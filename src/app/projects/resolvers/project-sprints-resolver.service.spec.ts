import { TestBed } from '@angular/core/testing';

import { ProjectSprintsResolver } from './project-sprints-resolver.service';

describe('ProjectSprintsResolver', () => {
  let service: ProjectSprintsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSprintsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
