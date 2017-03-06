import { TestBed, inject } from '@angular/core/testing';

import { InitSystemService } from './init-system.service';

describe('InitSystemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitSystemService]
    });
  });

  it('should ...', inject([InitSystemService], (service: InitSystemService) => {
    expect(service).toBeTruthy();
  }));
});
