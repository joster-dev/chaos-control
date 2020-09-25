import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[fcControl]'
})
export class ControlDirective implements OnDestroy {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
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

  constructor() { }

  ngOnDestroy(): void {
    this.validation.complete();
  }

  onTouched() { }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
