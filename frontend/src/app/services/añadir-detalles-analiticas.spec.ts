import { TestBed } from '@angular/core/testing';

import { AñadirDetallesAnaliticasService } from './añadir-detalles-analiticas.service';

describe('NuevaEntradaFisicaService', () => {
  let service:AñadirDetallesAnaliticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AñadirDetallesAnaliticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});