import { Component, effect, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IconComponent } from '@joster-dev/icon';

import { ControlDirective } from '../../directives';

@Component({
    selector: 'jo-color',
    templateUrl: './color.component.html',
    styleUrls: [
        './color.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, IconComponent]
})
export class ColorComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  private partialHex = /^[0-9A-Fa-f]{1,6}$/;
  fullHex = /^[0-9A-Fa-f]{6}$/;

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

  onChangeColor(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.setModel(ele.value.substring(1).toUpperCase());
  }

  private setModel(value: string | null) {
    this.model.set(value);
    this.onChange(
      value !== null && this.fullHex.test(value)
        ? value
        : null
    );
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  onBeforeinput(e: Event): void {
    const event = e as InputEvent;
    if (event.data === null)
      return;
    const ele = event.target as HTMLInputElement;
    const tooLong = event.data.length + (ele.selectionStart || 0) > 6;
    const valid = this.partialHex.test(event.data);
    if (tooLong || !valid)
      event.preventDefault();
  }

  writeValue(value: string | null): void {
    if (value === undefined || typeof value !== 'string' || !this.partialHex.test(value))
      value = null;

    if (value === null || this.partialHex.test(value))
      this.model.set(value);
  }

  private invalidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && (typeof control.value !== 'string' || !this.fullHex.test(control.value))
        ? { invalid: control.value }
        : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator()
    ];

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
