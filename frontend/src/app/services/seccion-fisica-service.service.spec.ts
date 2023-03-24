import { TestBed } from '@angular/core/testing';

import { SeccionFisicaServiceService } from './seccion-fisica-service.service';

describe('SeccionFisicaServiceService', () => {
  let service: SeccionFisicaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccionFisicaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
