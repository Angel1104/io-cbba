import { TestBed } from '@angular/core/testing';

import { LenguajeDetectionService } from './lenguaje-detection.service';

describe('LenguajeDetectionService', () => {
  let service: LenguajeDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenguajeDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
