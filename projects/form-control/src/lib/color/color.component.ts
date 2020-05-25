import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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
export class ColorComponent implements ControlValueAccessor {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
    if (!(value === '' || typeof value === 'boolean'))
      throw new Error('required input must be: boolean');

    this._required = value === '' || value === true;
    this.validate();
  }
  _required = false;

  @Input() label?: string;

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

  isDisabled = false;
  addTimeouts: number[] = [];
  subtractTimeouts: number[] = [];

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  get value(): string | null {
    if (this.ngControl.control === null)
      throw new Error('control is null');
    return this.ngControl.control.value;
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

  startAdd(part: 0 | 1 | 2) {
    this.add(part);

    this.addTimeouts[part] = window
      .setTimeout(() => this.startAdd(part), 150);
  }

  stopAdd(part: 0 | 1 | 2) {
    window.clearTimeout(this.addTimeouts[part]);
  }

  startSubtract(part: 0 | 1 | 2) {
    this.add(part);

    this.addTimeouts[part] = window
      .setTimeout(() => this.startSubtract(part), 150);
  }

  stopSubtract(part: 0 | 1 | 2) {
    window.clearTimeout(this.subtractTimeouts[part]);
  }

  isDisabledAdd(part: 0 | 1 | 2) {
    const idx = part * 2;
    return this.isDisabled === true
      || this.ngControl.control?.invalid === true
      || this.value === null
      || parseInt(this.value.substring(idx, idx + 2), 16) + 1 > 255;
  }

  isDisabledSubtract(part: 0 | 1 | 2) {
    const idx = part * 2;
    return this.isDisabled === true
      || this.ngControl.control?.invalid === true
      || this.value === null
      || parseInt(this.value.substring(idx, idx + 2), 16) - 1 < 0;
  }

  add(part: 0 | 1 | 2) {
    if (this.isDisabledAdd(part)) {
      console.log(new Date().getTime())
      return;
    }

    if (this.value === null) {
      this.model = 'FFFFFF';
      return;
    }

    const idx = part * 2;
    const newValue = parseInt(this.value.substring(idx, idx + 2), 16) + 1;
    this.model = this.value.substring(0, idx)
      + this.toHexString(newValue)
      + this.value.substring(idx + 2, this.value.length);
  }

  subtract(part: 0 | 1 | 2) {
    if (this.isDisabledSubtract(part))
      return;

    if (this.value === null) {
      this.model = '000000';
      return;
    }

    const idx = part * 2;
    const newValue = parseInt(this.value.substring(idx, idx + 2), 16) - 1;
    this.model = this.value.substring(0, idx)
      + this.toHexString(newValue)
      + this.value.substring(idx + 2, this.value.length);
  }

  onBeforeinput(event: InputEvent) {
    if (event.data !== null && /^[0-9A-Fa-f]{1,6}$/.test(event.data) === false)
      event.preventDefault();
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  onTouched() { }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
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
