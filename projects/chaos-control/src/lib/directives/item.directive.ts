import { Directive, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { isItems, isNumber, isPrimitive, Item, primitive } from '../models';

import { ControlDirective } from './control.directive';

@Directive({
  selector: '[joItem]'
})
export class ItemDirective extends ControlDirective implements ControlValueAccessor {
  @Input()
  get items() {
    return this._items;
  }
  set items(value: { key: boolean | number | string, value: string, [key: string]: unknown }[]) {
    if (!isItems(value))
      throw new Error('[items] expects: { key: boolean | number | string, value: string }[]');
    this._items = value;
    this.validation.next();
  }
  _items: Item[] = [];

  @Input()
  get limit() {
    return this._limit;
  }
  set limit(value: number) {
    if (value == null)
      value = 0;

    if (!isNumber(value) || value < 0 || !Number.isInteger(value))
      throw new Error('limit expects: positive integer');

    this._limit = value;
    this.validation.next();
  }
  _limit = 0;

  @Input()
  get isMultiple() {
    return this._isMultiple;
  }
  set isMultiple(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('multiple expects: boolean')
    this._isMultiple = value;
  }
  _isMultiple = false;

  set model(value: primitive[]) {
    this._model = value;
    this.onChange(
      value.length === 0
        ? null
        : this.isMultiple
          ? this._model
          : this._model[0]
    );
  }
  _model: primitive[] = [];

  constructor(
    @Self() public ngControl: NgControl
  ) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
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
      this._model = value;
  }

  private invalidValidator(items: Item[], isMultiple: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      (
        isMultiple
          ? Array.isArray(control.value) && control.value.every((key: any) => !items.map(item => item.key).includes(key))
          : control.value !== null && !items.map(item => item.key).includes(control.value)
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
      this.invalidValidator(this._items, this._isMultiple),
    ];

    if (this._isMultiple)
      validators.push(this.limitValidator(this._limit));

    if (this.required === true)
      validators.push(Validators.required);

    if (this.ngControl.control === null)
      throw new Error('expected control to be defined');

    this.ngControl.control.setValidators(validators);
    this.ngControl.control.updateValueAndValidity();
  }
}
