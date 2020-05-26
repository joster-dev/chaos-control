import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ControlConnector } from '../control-connector';

@Component({
  selector: 'fc-color',
  templateUrl: './color.component.html',
  styleUrls: [
    './color.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ]
})
export class ColorComponent extends ControlConnector implements ControlValueAccessor {
  @Input()
  get placeholder() {
    if (this._placeholder === null)
      return '';

    return this._placeholder;
  }
  set placeholder(value: any) {
    if (value === undefined)
      value = null;

    if (!(value === null || typeof value === 'string' || /^[0-9A-Fa-f]{6}$/.test(value)))
      throw new Error('placeholder input must be: hex string');

    this._placeholder = value;
  }
  _placeholder: string | null = null;

  get model() {
    return this._model;
  }
  set model(value: string | null) {
    if (value === '')
      value = null;

    this._model = value;
    this.onChange(
      this._model !== null && (/^[0-9A-Fa-f]{6}$/.test(this._model) === false)
        ? null
        : this._model
    );
  }
  _model: string | null = null;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  get value(): string | null {
    if (this.ngControl.control === null)
      throw new Error('control is null');
    return this.ngControl.control.value;
  }

  get squareFill() {
    if (this.value !== null && /^[0-9A-Fa-f]{6}$/.test(this.value))
      return this.value;
    if (this._placeholder !== null)
      return this._placeholder;
    return null;
  }

  display(part: 0 | 1 | 2) {
    if (part === 0)
      return 'Red';
    if (part === 1)
      return 'Green';
    return 'Blue';
  }

  fill(part: 0 | 1 | 2) {
    if (part === 0)
      return 'FF0000';
    if (part === 1)
      return '00FF00';
    return '0000FF';
  }

  isDisabledAdd(part: 0 | 1 | 2) {
    const idx = part * 2;
    let value = this.value;
    if (!(value !== null && /^[0-9A-Fa-f]{6}$/.test(value)))
      value = this._placeholder;
    return this.isDisabled === true
      || value === null
      || parseInt(value.substring(idx, idx + 2), 16) + 1 > 255;
  }

  isDisabledSubtract(part: 0 | 1 | 2) {
    const idx = part * 2;
    let value = this.value;
    if (!(value !== null && /^[0-9A-Fa-f]{6}$/.test(value)))
      value = this._placeholder;
    return this.isDisabled === true
      || value === null
      || parseInt(value.substring(idx, idx + 2), 16) - 1 < 0;
  }

  add(part: 0 | 1 | 2) {
    if (this.isDisabledAdd(part))
      return;

    let value = this.value;
    if (!(value !== null && /^[0-9A-Fa-f]{6}$/.test(value)))
      value = this._placeholder;

    if (value === null)
      throw new Error('cannot add null');

    const idx = part * 2;
    const newValue = parseInt(value.substring(idx, idx + 2), 16) + 1;
    this.model = value.substring(0, idx)
      + this.toHexString(newValue)
      + value.substring(idx + 2, value.length);
  }

  subtract(part: 0 | 1 | 2) {
    if (this.isDisabledSubtract(part))
      return;

    let value = this.value;
    if (!(value !== null && /^[0-9A-Fa-f]{6}$/.test(value)))
      value = this._placeholder;

    if (value === null)
      throw new Error('cannot subtract null');

    const idx = part * 2;
    const newValue = parseInt(value.substring(idx, idx + 2), 16) - 1;
    this.model = value.substring(0, idx)
      + this.toHexString(newValue)
      + value.substring(idx + 2, value.length);
  }

  onBeforeinput(event: InputEvent) {
    if (event.data !== null && /^[0-9A-Fa-f]{1,6}$/.test(event.data) === false)
      event.preventDefault();
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    if (value !== null && value !== undefined && typeof value !== 'string')
      throw new Error('control value must be: string');

    if (value === undefined || value === '' || /^[0-9A-Fa-f]{1,6}$/.test(value) === false)
      value = null;

    this._model = value;
  }

  private toHexString(value: number, length = 2) {
    let result = value.toString(16).toUpperCase();
    while (result.length < length)
      result = `0${result}`;
    return result;
  }

  private invalidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && /^[0-9A-Fa-f]{6}$/.test(control.value) === false
        ? { invalid: control.value }
        : null
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator()
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
