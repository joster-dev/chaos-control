import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { BrDirective } from './br.directive';

@Directive({
  selector: '[joControl]'
})
export class ControlDirective extends BrDirective implements OnDestroy {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('required input must be: boolean');
    this._required = value;
    this.validation.next();
  }
  _required = false;

  isDisabled = false;
  validation = new Subject<void>();

  constructor() {
    super();
  }

  ngOnDestroy(): void {
    this.validation.complete();
  }

  onTouched() { }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
