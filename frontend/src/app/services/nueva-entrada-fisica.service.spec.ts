import { TestBed } from '@angular/core/testing';

import { NuevaEntradaFisicaService } from './nueva-entrada-fisica.service';

describe('NuevaEntradaFisicaService', () => {
  let service: NuevaEntradaFisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaEntradaFisicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
