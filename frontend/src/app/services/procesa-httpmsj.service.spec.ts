import { TestBed } from '@angular/core/testing';

import { ProcesaHttpmsjService } from './procesa-httpmsj.service';

describe('ProcesaHttpmsjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesaHttpmsjService = TestBed.get(ProcesaHttpmsjService);
    expect(service).toBeTruthy();
  });
});
