import { TestBed } from '@angular/core/testing';

import { NuevoPacienteMedicoService } from './nuevo-paciente-medico.service';

describe('NuevoPacienteMedicoService', () => {
  let service: NuevoPacienteMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoPacienteMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});