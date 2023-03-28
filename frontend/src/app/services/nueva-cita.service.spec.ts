import { TestBed } from '@angular/core/testing';

import { NuevaCitaService } from './nueva-cita.service';

describe('NuevaCitaService', () => {
  let service: NuevaCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
