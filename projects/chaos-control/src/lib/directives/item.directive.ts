import { booleanAttribute, Directive, effect, inject, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isItems, isNumber, isPrimitive, Item, primitive } from '../models';

import { ControlDirective } from './control.directive';

function toItems(value: { key: boolean | number | string, value: string, [key: string]: unknown }[]): Item[] {
  if (!isItems(value))
    throw new Error('[items] expects: { key: boolean | number | string, value: string }[]');
  return value;
}

function toLimit(value: number): number {
  if (value == null)
    value = 0;
  if (!isNumber(value) || value < 0 || !Number.isInteger(value))
    throw new Error('limit expects: positive integer');
  return value;
}

@Directive({
    selector: '[ccItem]'
})
export class ItemDirective extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  items = input([] as Item[], { transform: toItems });
  limit = input(0, { transform: toLimit });
  isMultiple = input(false, { transform: booleanAttribute });

  model = signal<primitive[]>([]);

  constructor() {
    super();
    this.ngControl.valueAccessor = this;

    // Re-run validation synchronously whenever an input that feeds the
    // validators changes. No debounce means validity repaints under zoneless.
    effect(() => {
      this.items();
      this.limit();
      this.isMultiple();
      this.required();
      this.validate();
    });
  }

  protected setModel(value: primitive[]) {
    this.model.set(value);
    this.onChange(
      value.length === 0
        ? null
        : this.isMultiple()
          ? value
          : value[0]
    );
  }

  onChange(_value: primitive[] | primitive | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: primitive[] | primitive | null) {
    if (value == null)
      value = [];

    if (!Array.isArray(value))
      value = [value];

    if (value.every(item => isPrimitive(item)))
      this.model.set(value);
  }

  private invalidValidator(items: Item[], isMultiple: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      (
        isMultiple
          ? Array.isArray(control.value) && control.value.every((key: any) => !items.map(item => item.key).includes(key))
          : ![undefined, null].includes(control.value) && !items.map(item => item.key).includes(control.value)
      )
        ? { invalid: control.value }
        : null;
  }

  private limitValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && limit !== 0 && control.value.length > limit
        ? { limit: { value: control.value } }
        : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(this.items(), this.isMultiple()),
    ];

    if (this.isMultiple())
      validators.push(this.limitValidator(this.limit()));

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
