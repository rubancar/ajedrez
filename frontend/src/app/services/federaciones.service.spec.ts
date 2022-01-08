import { TestBed } from '@angular/core/testing';

import { FederacionesService } from './federaciones.service';

describe('FederacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FederacionesService = TestBed.get(FederacionesService);
    expect(service).toBeTruthy();
  });
});
