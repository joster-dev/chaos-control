import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ControlDirective } from './control.directive';

describe('ControlDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new ControlDirective());
    expect(directive).toBeTruthy();
  });
});
