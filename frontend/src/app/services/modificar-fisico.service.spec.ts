import { TestBed } from '@angular/core/testing';

import { ModificarFisicoService } from './modificar-fisico.service';

describe('ModificarFisicoService', () => {
  let service: ModificarFisicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarFisicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
