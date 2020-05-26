import { KeyValue } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ControlConnector } from '../control-connector';
import { isItems, isPrimitive, primitive } from '../primitive';

@Component({
  selector: 'fc-choice',
  templateUrl: './choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss'
  ]
})
export class ChoiceComponent extends ControlConnector implements ControlValueAccessor {
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

  set model(value: primitive | null) {
    this._model = value;
    this.onChange(value);
  }
  _model: primitive | null = null;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
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
