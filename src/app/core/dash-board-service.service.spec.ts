import { TestBed } from '@angular/core/testing';

import { DashBoardServiceService } from './dash-board-service.service';

describe('DashBoardServiceService', () => {
  let service: DashBoardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashBoardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
