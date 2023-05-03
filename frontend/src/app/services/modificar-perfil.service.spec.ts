import { TestBed } from '@angular/core/testing';

import { ModificarPerfilService } from './modificar-perfil.service';

describe('ModificarMentalService', () => {
  let service: ModificarPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});