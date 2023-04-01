import { TestBed } from '@angular/core/testing';

import { ModificarCitaService } from './modificar-cita.service';

describe('ModificarCitaService', () => {
  let service: ModificarCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
