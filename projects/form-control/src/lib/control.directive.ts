import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[fcControl]'
})
export class ControlDirective implements OnDestroy {
  @Input()
  get label() {
    if (this._label === undefined)
      return '';
    return this._label;
  }
  set label(value: any) {
    if (value === null)
      value = undefined;
    if (typeof value === 'number')
      value = value.toString();
    if (value !== undefined && typeof value !== 'string')
      throw new Error('label input must be: string');
    this._label = value;
  }
  _label?: string;

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
