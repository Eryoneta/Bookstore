import { TestBed } from '@angular/core/testing';

import { ClientAcessGuardService } from './client-acess-guard.service';

describe('ClientAcessGuardService', () => {
  let service: ClientAcessGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAcessGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
