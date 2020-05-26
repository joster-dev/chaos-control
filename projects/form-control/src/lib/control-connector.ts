import { Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class ControlConnector implements OnDestroy {
  @Input()
  get label() {
    if (this._label === undefined)
      return '';

    return this._label;
  }
  set label(value: any) {
    if (typeof value !== 'string')
      throw new Error('label input must be: string');

    this._label = value;
  }
  _label?: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
    if (!(value === null || value === '' || typeof value === 'boolean'))
      throw new Error('required input must be: boolean');

    this._required = value === '' || value === true;
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
