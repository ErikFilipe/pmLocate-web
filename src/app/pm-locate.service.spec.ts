import { TestBed, inject } from '@angular/core/testing';

import { PmLocateService } from './pm-locate.service';

describe('PmLocateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmLocateService]
    });
  });

  it('should be created', inject([PmLocateService], (service: PmLocateService) => {
    expect(service).toBeTruthy();
  }));
});
