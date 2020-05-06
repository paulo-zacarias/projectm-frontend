import { TestBed } from '@angular/core/testing';

import { ParticipantsResolver } from './participants-resolver.service';

describe('ParticipantsResolverService', () => {
  let service: ParticipantsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
