import { TestBed } from '@angular/core/testing';

import { PartidasService } from './partidas.service';

describe('PartidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartidasService = TestBed.get(PartidasService);
    expect(service).toBeTruthy();
  });
});
