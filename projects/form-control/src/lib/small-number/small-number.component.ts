import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'fc-small-number',
  templateUrl: './small-number.component.html',
  styleUrls: ['./small-number.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SmallNumberComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SmallNumberComponent),
      multi: true
    }
  ]
})
export class SmallNumberComponent implements ControlValueAccessor, Validator {
  @Input() min = 0;
  @Input() max = 9;
  @Input() step = 1;
  @Input() showNull = false;

  disabled = false;
  _model: number | null = null;
  get model() {
    return this._model;
  }
  set model(value: number | null) {
    this._model = value;
    this.onChange(this._model);
  }
  onChange = (model: number | null) => {};
  onTouched = () => {};

  constructor() {}

  get disableAdd() {
    if (this.model === null) return false;
    return this.model + this.step > this.max;
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

  get disableSubtract() {
    if (this.model === null) return false;
    return this.model - this.step < this.min;
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
    const max = this.max < Number(this.model);
    const min = this.min > Number(this.model);
    if (!max && !min) {
      return null;
    } else if (max) {
      return { max: true };
    } else if (min) {
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
