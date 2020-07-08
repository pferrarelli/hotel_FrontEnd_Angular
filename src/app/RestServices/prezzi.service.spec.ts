import { TestBed } from '@angular/core/testing';

import { PrezziService } from './prezzi.service';

describe('PrezziService', () => {
  let service: PrezziService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrezziService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
