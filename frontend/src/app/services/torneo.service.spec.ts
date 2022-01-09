import { TestBed } from '@angular/core/testing';

import { TorneoService } from './torneo.service';

describe('TorneoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TorneoService = TestBed.get(TorneoService);
    expect(service).toBeTruthy();
  });
});
