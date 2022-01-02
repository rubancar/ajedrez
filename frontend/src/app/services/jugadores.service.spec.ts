import { TestBed } from '@angular/core/testing';

import { JugadoresService } from './jugadores.service';

describe('JugadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JugadoresService = TestBed.get(JugadoresService);
    expect(service).toBeTruthy();
  });
});
