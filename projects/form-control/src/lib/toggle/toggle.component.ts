import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fc-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleComponent)
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() showNull = false;

  disabled = false;
  _model: boolean | null = null;
  get model() {
    return this._model;
  }
  set model(value: boolean | null) {
    this._model = value;
    this.onChange(value);
  }
  onChange = (value: boolean | null) => {};
  onTouched = () => {};

  constructor() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: any) {
    if (value !== null && typeof value !== 'boolean') {
      throw new Error('control value must be boolean or null');
    }

    this._model = value;
  }
}
