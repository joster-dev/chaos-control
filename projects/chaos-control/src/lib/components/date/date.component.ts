import { Component, effect, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ValidatorFn, Validators } from '@angular/forms';

import { ControlDirective } from '../../directives';

@Component({
    selector: 'cc-date',
    templateUrl: './date.component.html',
    styleUrls: [
        './date.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class DateComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

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
    this.setModel(value);
  }

  private setModel(value: string | null) {
    if (value === '')
      value = null;

    this.model.set(value);
    this.onChange(value);
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: string | null): void {
    if (value === '' || value === undefined)
      value = null;

    if (value === null || typeof value === 'string')
      this.model.set(value);
  }

  private validate() {
    const validators: ValidatorFn[] = [];

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
