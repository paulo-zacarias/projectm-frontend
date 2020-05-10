import { TestBed } from '@angular/core/testing';

import { ProjectSprintsResolverService } from './project-sprints-resolver.service';

describe('ProjectSprintsResolverService', () => {
  let service: ProjectSprintsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectSprintsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
