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
    this._required = value === '' || value === true;
    this.validate();
  }
  _required = false;

  @Input()
  get min() {
    return this._min
  }
  set min(value: any) {
    if (/^[0-9A-Fa-f]{6}$/.test(value) === false)
      throw new Error('min input must be hex string');
    this._min = value;
    this.validate()
  }
  _min = '000000';

  @Input()
  get max() {
    return this._max;
  }
  set max(value: any) {
    if (/^[0-9A-Fa-f]{6}$/.test(value) === false)
      throw new Error('max input must be hex string');
    this._max = value;
    this.validate();
  }
  _max = 'ffffff';

  @Input() label?: string;

  get model() {
    return this._model;
  }
  set model(value: string | null) {
    this._model = value === ''
      ? null
      : value;
    this.onChange(
      this._model !== null && (/^[0-9A-Fa-f]{6}$/.test(this._model) === false)
        ? null
        : this._model
    );
  }
  _model: string | null = null;

  isDisabled = false;

  constructor(
    @Self() public ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
    this.validate();
  }

  onBeforeinput(event: InputEvent) {
    if (event.data !== null && /^[0-9A-Fa-f]$/.test(event.data) === false)
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
      throw new Error('control value must be string');

    if (value === '' || value === undefined || /^[0-9A-Fa-f]{6}$/.test(value) === false)
      value = null;

    this._model = value;
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
