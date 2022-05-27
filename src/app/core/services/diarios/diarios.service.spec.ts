import { TestBed } from '@angular/core/testing';

import { DiariosService } from './diarios.service';

describe('DiariosService', () => {
  let service: DiariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
