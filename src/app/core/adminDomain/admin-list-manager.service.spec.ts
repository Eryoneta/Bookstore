import { TestBed } from '@angular/core/testing';

import { AdminListManagerService } from './admin-list-manager.service';

describe('AdminListManagerService', () => {
  let service: AdminListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
