import { TestBed } from '@angular/core/testing';

import { ModificarMentalService } from './modificar-mental.service';

describe('ModificarMentalService', () => {
  let service: ModificarMentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarMentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});