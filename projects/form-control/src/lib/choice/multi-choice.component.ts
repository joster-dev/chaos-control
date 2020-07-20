import { KeyValue } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { isPrimitive, primitive } from '../primitive';
import { ChoiceDirective } from './choice.directive';

@Component({
  selector: 'fc-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss',
    './multi-choice.component.scss'
  ]
})
export class MultiChoiceComponent extends ChoiceDirective implements ControlValueAccessor {
  @Input()
  get allowClear() {
    return this._allowClear === true
      && this.isDisabled === false
      && this.required === false
      && this.items.length > 3;
  }
  set allowClear(value: any) {
    if (value === '')
      value = true;
    if (value === null || value === undefined)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('allowClear input must be: boolean');
    this._allowClear = value;
  }
  _allowClear = true;

  @Input()
  get limit() {
    return this._limit;
  }
  set limit(value: any) {
    if (value === null || value === undefined)
      value = 0;
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0)
      throw new Error('limit input must be: integer greater than -1');
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
      control.value !== null && control.value.every((key: any) => !items.map(item => item.key).includes(key))
        ? { invalid: control.value }
        : null;
  }

  private limitValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && limit !== 0 && control.value.length > limit
        ? { limit: control.value }
        : null;
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
