import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'fc-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IntegerComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntegerComponent),
      multi: true
    }
  ]
})
export class IntegerComponent implements ControlValueAccessor, Validator {
  @Input() min = 0;
  @Input() max = 9;
  @Input() step = 1;
  @Input() showNull = false;
  @Input() required = false;

  disabled = false;
  error?: 'required' | 'min' | 'max';
  _model: number | null = null;
  onChange = (_model: number | null) => { };
  onTouched = () => { };

  constructor() { }

  get model() {
    return this._model;
  }

  get disableAdd() {
    if (this.model === null) return false;

    return this.model + this.step > this.max;
  }

  get disableSubtract() {
    if (this.model === null) return false;

    return this.model - this.step < this.min;
  }

  set model(value: number | null) {
    this._model = value;
    this.onChange(this._model);
  }

  add() {
    if (this.model === null) {
      this.model = this.max;
      return;
    }

    if (this.model + this.step < this.min) {
      this.model = this.min;
      return;
    }

    this.model += this.step;
  }

  subtract() {
    if (this.model === null) {
      this.model = this.min;
      return;
    }

    if (this.model - this.step > this.max) {
      this.model = this.max;
      return;
    }

    this.model -= this.step;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    if (this.model === null) {
      if (this.required === true) {
        this.error = 'required';
        return { required: true };
      }

      return null;
    }

    if (this.model > this.max) {
      this.error = 'max';
      return { max: true };
    }

    if (this.model < this.min) {
      this.error = 'min';
      return { min: true };
    }

    return null;
  }

  writeValue(value: any) {
    if (value !== null && typeof value !== 'number') {
      throw new Error('control value must be number or null');
    }

    this._model = value;
  }
}
