import { TestBed } from '@angular/core/testing';

import { NuevaEntradaMentalService } from './nueva-entrada-mental.service';

describe('NuevaEntradaFisicaService', () => {
  let service: NuevaEntradaMentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaEntradaMentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});