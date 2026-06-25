import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BorderRadiusDirective } from './border-radius.directive';

describe('BorderRadiusDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new BorderRadiusDirective());
    expect(directive).toBeTruthy();
  });
});
