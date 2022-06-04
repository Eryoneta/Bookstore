import { TestBed } from '@angular/core/testing';

import { VisitorAcessGuardService } from './visitor-acess-guard.service';

describe('VisitorAcessGuardService', () => {
  let service: VisitorAcessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorAcessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
