import { TestBed, inject } from '@angular/core/testing';

import { CutImageService } from './cut-image.service';

describe('CutImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CutImageService]
    });
  });

  it('should be created', inject([CutImageService], (service: CutImageService) => {
    expect(service).toBeTruthy();
  }));
});
