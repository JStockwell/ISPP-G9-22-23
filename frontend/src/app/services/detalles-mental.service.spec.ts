import { TestBed } from '@angular/core/testing';

import { DetallesMentalService } from './detalles-mental.service';

describe('DetallesMentalService', () => {
  let service: DetallesMentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesMentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
