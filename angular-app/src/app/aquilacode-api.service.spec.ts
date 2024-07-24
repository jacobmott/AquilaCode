import { TestBed } from '@angular/core/testing';

import { AquilacodeApiService } from './aquilacode-api.service';

describe('AquilacodeApiService', () => {
  let service: AquilacodeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AquilacodeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
