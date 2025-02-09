import { TestBed } from '@angular/core/testing';

import { ControlCreateService } from './control-create.service';

describe('ControlCreateService', () => {
  let service: ControlCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
