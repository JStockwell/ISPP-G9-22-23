import { TestBed } from '@angular/core/testing';

import { DetallesCitaService } from './detalles-cita.service';

describe('DetallesCitaService', () => {
  let service: DetallesCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
