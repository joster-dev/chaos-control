import { KeyValue } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { isItems, isPrimitive, primitive } from '../primitive';

@Component({
  selector: 'fc-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss'
  ]
})
export class MultiChoiceComponent implements ControlValueAccessor {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
    if (!(value === '' || typeof value === 'boolean'))
      throw new Error('required input must be: boolean');

    this._required = value === '' || value === true;
    this.validate();
  }
  _required = false;

  @Input()
  get allowClear() {
    return this._allowClear === true
      && this.isDisabled === false
      && this.required === false
      && this.items.length > 3;
  }
  set allowClear(value: any) {
    if (!(value === '' || typeof value === 'boolean'))
      throw new Error('allowClear input must be: boolean');

    this._allowClear = value === '' || value === true;
  }
  _allowClear = true;

  @Input()
  get items() {
    return this._items;
  }
  set items(value: any) {
    if (isItems(value) === false)
      throw new Error('items input must be: KeyValue<primitive, string>[]');

    this._items = value;
    this.validate();
  }
  _items: KeyValue<primitive, string>[] = [];

  @Input() label?: string;
  @Input() limit = 0;

  isDisabled = false;
  _model: primitive[] = [];

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  set model(value: primitive[]) {
    this._model = value;
    this.onChange(this._model.length === 0 ? null : this._model);
  }

  onClick(item: KeyValue<primitive, string>) {
    this._model = this.removeInvalid();
    if (this._model.includes(item.key) === true) {
      if (this.required === true && this._model.length === 1)
        return;

      this.model = this._model.filter(key => key !== item.key);
      return;
    }
    this.model = [...this._model, item.key];
  }

  onChange(_value: primitive[] | null) { }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  onTouched() { }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any) {
    const isPrimitiveArray = Array.isArray(value) === true
      && value.every((item: any) => isPrimitive(item) === true) === true;

    if (value !== null && value !== undefined && isPrimitiveArray !== true)
      throw new Error('control value must be primitive array');

    if (value === undefined || value === null)
      value = [];

    this._model = value;
  }

  private removeInvalid(): primitive[] {
    return this._model.filter(key => this._items.map(item => item.key).includes(key));
  }

  private invalidValidator(items: KeyValue<primitive, string>[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && control.value.every((key: any) => items.map(item => item.key).includes(key) === true) === false
        ? { invalid: control.value }
        : null
  }

  private limitValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && limit > 0 && control.value.length > limit
        ? { limit: control.value }
        : null
  }

  private validate() {
    const validators = [
      this.invalidValidator(this.items),
      this.limitValidator(this.limit)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
