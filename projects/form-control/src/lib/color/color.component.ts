import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, ValidationErrors, AbstractControl, NgControl, ValidatorFn, Validators } from '@angular/forms';

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

  @Input()
  get min() {
    return this._min
  }
  set min(value: any) {
    if (typeof value !== 'string' || /^[0-9A-Fa-f]{6}$/.test(value) === false)
      throw new Error('min input must be: hex string');

    this._min = value;
    this.validate()
  }
  _min = '000000';

  @Input()
  get max() {
    return this._max;
  }
  set max(value: any) {
    if (typeof value !== 'string' || /^[0-9A-Fa-f]{6}$/.test(value) === false)
      throw new Error('max input must be: hex string');

    this._max = value;
    this.validate();
  }
  _max = 'FFFFFF';

  @Input() label?: string;
  @Input() step = 16;

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

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  get isDisabledAdd() {
    return this.isDisabled === true
      || this.model !== null
      && parseInt(this.model, 16) + this.step > parseInt(this.max, 16);
  }

  get isDisabledSubtract() {
    return this.isDisabled === true
      || this.model !== null
      && parseInt(this.model, 16) - this.step < parseInt(this.min, 16);
  }

  add() {
    if (this.model === null) {
      this.model = this.max;
      return;
    }

    if (parseInt(this.model, 16) + this.step < parseInt(this.min, 16)) {
      this.model = this.min;
      return;
    }

    this.model = this.addHex(parseInt(this.model, 16), this.step);
  }

  subtract() {
    if (this.model === null) {
      this.model = this.min;
      return;
    }

    if (parseInt(this.model, 16) - this.step > parseInt(this.max, 16)) {
      this.model = this.max;
      return;
    }

    this.model = this.addHex(parseInt(this.model, 16), -this.step);
  }

  onBeforeinput(event: InputEvent) {
    if (event.data !== null && /^[0-9A-Fa-f]{1,6}$/.test(event.data) === false)
      event.preventDefault();
  }

  onKeydown(event: KeyboardEvent) {
    const isArrowDown = event.code === 'ArrowDown';
    const isArrowUp = event.code === 'ArrowUp'

    if (!(isArrowDown || isArrowUp))
      return;

    event.preventDefault();

    if (isArrowDown && !this.isDisabledSubtract)
      this.subtract();

    if (isArrowUp && !this.isDisabledAdd)
      this.add();
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

  private addHex(value1: number, value2: number) {
    const sum = value1 + value2;
    let result = sum.toString(16);
    while (result.length < 6)
      result = `0${result}`;

    return result.toUpperCase();
  }

  private invalidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && /^[0-9A-Fa-f]{6}$/.test(control.value) === false
        ? { invalid: control.value }
        : null
  }

  private minValidator(min: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      parseInt(control.value, 16) < parseInt(min, 16)
        ? { min: control.value }
        : null
  }

  private maxValidator(max: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      parseInt(control.value, 16) > parseInt(max, 16)
        ? { max: control.value }
        : null
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(),
      this.minValidator(this.min),
      this.maxValidator(this.max)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
