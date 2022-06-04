import { TestBed } from '@angular/core/testing';

import { AdminAcessGuardService } from './admin-acess-guard.service';

describe('AdminAcessGuardService', () => {
  let service: AdminAcessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAcessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
