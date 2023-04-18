import { TestBed } from '@angular/core/testing';

import { MedicHomeService } from './medic-home.service';

describe('MedicHomeService', () => {
  let service: MedicHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});