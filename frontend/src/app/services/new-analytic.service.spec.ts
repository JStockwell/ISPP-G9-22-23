import { TestBed } from '@angular/core/testing';

import { NewAnalyticService } from './new-analytic.service';

describe('NewAnalyticService', () => {
  let service: NewAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
