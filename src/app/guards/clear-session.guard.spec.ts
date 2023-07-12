import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clearSessionGuard } from './clear-session.guard';

describe('clearSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clearSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
