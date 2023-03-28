import { TestBed } from '@angular/core/testing';

import { CalendarioService } from './calendario.service';

describe('CalendarioService', () => {
  let service: CalendarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
