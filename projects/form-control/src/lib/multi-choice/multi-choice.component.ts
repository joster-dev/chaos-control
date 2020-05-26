import { KeyValue } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ControlConnector } from '../control-connector';
import { isItems, isPrimitive, primitive } from '../primitive';

@Component({
  selector: 'fc-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss'
  ]
})
export class MultiChoiceComponent extends ControlConnector implements ControlValueAccessor {
  @Input()
  get allowClear() {
    return this._allowClear === true
      && this.isDisabled === false
      && this.required === false
      && this.items.length > 3;
  }
  set allowClear(value: any) {
    if (!(value === null || value === '' || typeof value === 'boolean'))
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
    this.validation.next();
  }
  _items: KeyValue<primitive, string>[] = [];

  @Input()
  get limit() {
    return this._limit;
  }
  set limit(value: any) {
    if (!(typeof value === 'number' || Number.isInteger(value)))
      throw new Error('limit input must be: integer');

    this._limit = value;
    this.validation.next();
  }
  _limit = 0;

  _model: primitive[] = [];
  set model(value: primitive[]) {
    this._model = value;
    this.onChange(this._model.length === 0 ? null : this._model);
  }

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
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
