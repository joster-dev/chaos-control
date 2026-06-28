import { booleanAttribute, Component, computed, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ValidatorFn, Validators } from '@angular/forms';

import { ControlDirective } from '../../directives';

@Component({
    selector: 'cc-time',
    templateUrl: './time.component.html',
    styleUrls: [
        './time.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class TimeComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  withSeconds = input(false, { transform: booleanAttribute });

  // A step that is not a whole minute is what makes the native control expose
  // a seconds field; 60 keeps it at HH:MM.
  step = computed(() => this.withSeconds() ? 1 : 60);

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
