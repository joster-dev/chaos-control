import { TestBed } from '@angular/core/testing';

import { ChaosControlService } from './chaos-control.service';

describe('ChaosControlService', () => {
  let service: ChaosControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChaosControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
