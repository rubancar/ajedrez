import { TestBed } from '@angular/core/testing';

import { EntrenadoresService } from './entrenadores.service';

describe('EntrenadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrenadoresService = TestBed.get(EntrenadoresService);
    expect(service).toBeTruthy();
  });
});
