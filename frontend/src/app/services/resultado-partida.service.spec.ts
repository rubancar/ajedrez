import { TestBed } from '@angular/core/testing';

import { ResultadoPartidaService } from './resultado-partida.service';

describe('ResultadoPartidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultadoPartidaService = TestBed.get(ResultadoPartidaService);
    expect(service).toBeTruthy();
  });
});
