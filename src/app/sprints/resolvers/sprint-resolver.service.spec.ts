import { TestBed } from '@angular/core/testing';

import { SprintResolver } from './sprint-resolver.service';

describe('SprintResolver', () => {
  let service: SprintResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
