import { TestBed } from '@angular/core/testing';

import { RelacionService } from './relacion.service';

describe('RelacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelacionService = TestBed.get(RelacionService);
    expect(service).toBeTruthy();
  });
});
