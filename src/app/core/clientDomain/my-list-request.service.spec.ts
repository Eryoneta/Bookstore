import { TestBed } from '@angular/core/testing';

import { MyListRequestService } from './my-list-request.service';

describe('MyListRequestService', () => {
  let service: MyListRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyListRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
