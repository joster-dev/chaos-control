import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BrDirective } from './br.directive';

@Directive({
  selector: '[fcControl]'
})
export class ControlDirective extends BrDirective implements OnDestroy {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: boolean | string) {
    if (value === '')
      value = true;
    if (value === null || value === undefined)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('required input must be: boolean');
    this._required = value;
    this.validation.next();
  }
  _required = false;

  isDisabled = false;
  validation = new Subject<void>();

  constructor(public hostElement: ElementRef) {
    super();
  }

  ngOnDestroy(): void {
    this.validation.complete();
  }

  get hostElementStyleColor(): string {
    this.hostElement.nativeElement.getComputedStyle();
    return '';
  }

  onTouched() { }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
