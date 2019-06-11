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
  styleUrls: ['./small-number.component.scss', '../button.scss'],
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

  isDisabled = false;
  model = 0;

  constructor() {}

  decrement() {
    this.model -= this.step;
    this.onChange(this.model);
    this.onTouched();
  }

  increment() {
    this.model += this.step;
    this.onChange(this.model);
    this.onTouched();
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
    this.isDisabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    const max = this.max < this.model;
    const min = this.min > this.model;
    if (!max && !min) {
      return null;
    }
    if (max) {
      return { max: true };
    }
    if (min) {
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
