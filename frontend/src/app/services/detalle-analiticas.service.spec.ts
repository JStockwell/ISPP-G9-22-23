import { TestBed } from '@angular/core/testing';

import { DetalleAnaliticasService } from './detalle-analiticas.service';

describe('DetalleAnaliticasService', () => {
  let service: DetalleAnaliticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleAnaliticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
