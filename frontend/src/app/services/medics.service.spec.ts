import { TestBed } from '@angular/core/testing';

import { MedicsService } from './medics.service';

describe('MedicsService', () => {
  let service: MedicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
