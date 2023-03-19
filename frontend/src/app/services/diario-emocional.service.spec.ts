import { TestBed } from '@angular/core/testing';

import { DiarioEmocionalService } from './diario-emocional.service';

describe('DiarioEmocionalService', () => {
  let service: DiarioEmocionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiarioEmocionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
