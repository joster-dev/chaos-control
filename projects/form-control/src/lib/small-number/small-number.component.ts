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
  styleUrls: ['./small-number.component.scss'],
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
  @Input() disabled = false;
  @Input() min = 0;
  @Input() max = 9;
  @Input() step = 1;

  model = 0;

  constructor() {}

  get canAdd(): boolean {
    return this.disabled === false && this.model + this.step <= this.max;
  }

  add() {
    if (this.canAdd === false) return;
    this.model += this.step;
    this.onChange(this.model);
  }

  get canSubtract(): boolean {
    return this.disabled === false && this.model - this.step >= this.min;
  }

  subtract() {
    if (this.canSubtract === false) return;
    this.model -= this.step;
    this.onChange(this.model);
  }

  onChange(value: number) {}

  onTouched() {}

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
    const max = this.max < this.model;
    const min = this.min > this.model;
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
    const number = Number(value);
    if (value === '' || isNaN(number)) {
      throw new Error('control value must be number or null');
    }
    this.model = number;
  }
}
