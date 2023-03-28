import { TestBed } from '@angular/core/testing';

import { ModificarDetallesService } from './modificar-detalles.service';

describe('ModificarDetallesService', () => {
  let service: ModificarDetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarDetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});