import { TestBed } from '@angular/core/testing';

import { DisplayComponentsService } from './display-components.service';

describe('DisplayComponentsService', () => {
  let service: DisplayComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
