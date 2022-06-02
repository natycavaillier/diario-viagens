import { TestBed } from '@angular/core/testing';

import { OnlyAdminGuard } from './only-admin.guard';

describe('OnlyAdminGuard', () => {
  let guard: OnlyAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
