import { TestBed } from '@angular/core/testing';

import { ClientListManagerService } from './client-list-manager.service';

describe('ClientListManagerService', () => {
  let service: ClientListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
