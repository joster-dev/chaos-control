import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'fc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, Validator {
  @Input() items: KeyValue<string | number, number>[] = [];

  // controls
  isDisabled = false;
  _model: number | string | null = null;
  onChange = (_model: number | string | null) => { };
  onTouched = () => { };
  // display
  isActive = false;
  showDropdown = false;
  searchTerm: string | null = null;

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    return null;
  }

  writeValue(value: any): void {
    if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('control value must be string or number or null')
    }

    this._model = value;
  }
}
