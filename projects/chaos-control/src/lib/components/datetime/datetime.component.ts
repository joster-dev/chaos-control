import { Component, effect, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ValidatorFn, Validators } from '@angular/forms';

import { ControlDirective } from '../../directives';

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

@Component({
    selector: 'cc-datetime',
    templateUrl: './datetime.component.html',
    styleUrls: [
        './datetime.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class DatetimeComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  // The native `datetime-local` control works in the user's local time. We keep
  // that local string for display, but always read/write a UTC ISO string on the
  // form control.
  model = signal<string | null>(null);

  id = `_${Math.random().toString(36).substring(2, 11)}`;

  constructor() {
    super();
    this.ngControl.valueAccessor = this;

    effect(() => {
      this.required();
      this.validate();
    });
  }

  onModelChange(value: string | null) {
    if (value === '')
      value = null;

    this.model.set(value);
    this.onChange(value === null ? null : this.toIso(value));
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: string | null): void {
    if (value === '' || value === undefined)
      value = null;

    this.model.set(typeof value === 'string' ? this.toLocal(value) : null);
  }

  // local "YYYY-MM-DDTHH:mm" → UTC ISO string
  private toIso(local: string): string | null {
    const date = new Date(local);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  // UTC ISO string → local "YYYY-MM-DDTHH:mm" for the native input
  private toLocal(iso: string): string | null {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime()))
      return null;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private validate() {
    const validators: ValidatorFn[] = [];

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
