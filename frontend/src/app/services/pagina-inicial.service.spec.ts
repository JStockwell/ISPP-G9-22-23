import { TestBed } from '@angular/core/testing';

import { PaginaInicialService } from './pagina-inicial.service';

describe('PaginaInicialService', () => {
  let service: PaginaInicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaInicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
