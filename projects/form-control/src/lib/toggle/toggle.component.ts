import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fc-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss', '../button.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleComponent)
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() showNull = false;

  model: boolean | null = null;

  constructor() {}

  action(value: boolean | null): void {
    if (this.disabled) return;
    this.model = value;
    this.onChange(this.model);
  }

  onChange(value: boolean | null) {}

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

  writeValue(value: any) {
    if (value !== null && typeof value !== 'boolean') {
      throw new Error('control value must be boolean or null');
    }

    this.model = value;
  }
}
