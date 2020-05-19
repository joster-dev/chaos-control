import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, ValidatorFn, Validators, ValidationErrors, AbstractControl, NgControl } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { primitive } from '../primitive/primitive.type';
import { isPrimitive } from '../primitive/is-primitive';

@Component({
  selector: 'fc-choice',
  templateUrl: './choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss'
  ]
})
export class ChoiceComponent implements ControlValueAccessor {
  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
    this._required = value === '' || value === true;
    this.validate();
  }
  _required = false;

  @Input()
  get items() {
    return this._items;
  }
  set items(value: any) {
    // if(Array.isArray(value) === false || value.every((item: any) => isPrimitive(item) === true) === false)
    //   throw new Error('items input must be: KeyValue<primitive, string>[]')
    this._items = value;
  }
  _items: KeyValue<primitive, string>[] = [];

  @Input() label?: string;

  get model() {
    return this._model;
  }
  set model(value: primitive | null) {
    this._model = value;
    this.onChange(value);
  }
  _model: primitive | null = null;

  isDisabled = false;

  constructor(
    @Self() public ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
    this.validate();
  }

  onClick(item: KeyValue<primitive, string>) {
    if (this._model === item.key) {
      if (this.required === true)
        return;

      this.model = null;
      return;
    }
    this.model = item.key;
  }

  onChange(_value: primitive | null) { }
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
    if (value !== null && value !== undefined && isPrimitive(value) === false)
      throw new Error('control value must be primitive');

    if (value === undefined)
      value = null;

    this._model = value;
  }

  private invalidValidator(items: KeyValue<primitive, string>[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && items.map(item => item.key).includes(control.value) === false
        ? { invalid: control.value }
        : null
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(this.items)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
