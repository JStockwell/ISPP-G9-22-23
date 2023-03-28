import { TestBed } from '@angular/core/testing';

import { DetallesFisicoService } from './detalles-fisico.service';

describe('DetallesFisicoService', () => {
  let service: DetallesFisicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesFisicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
