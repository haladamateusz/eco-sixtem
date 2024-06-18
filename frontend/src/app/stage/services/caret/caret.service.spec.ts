import { TestBed } from '@angular/core/testing';

import { CaretService } from './caret.service';

describe('CaretService', () => {
  let service: CaretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
