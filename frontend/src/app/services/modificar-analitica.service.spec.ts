import { TestBed } from '@angular/core/testing';

import { ModificarAnaliticaService } from './modificar-analitica.service';

describe('ModificarAnaliticaService', () => {
  let service: ModificarAnaliticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarAnaliticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
