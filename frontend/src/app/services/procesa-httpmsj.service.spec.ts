import { TestBed } from '@angular/core/testing';

import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

describe('ProcesaHTTPMsjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesaHTTPMsjService = TestBed.get(ProcesaHTTPMsjService);
    expect(service).toBeTruthy();
  });
});
