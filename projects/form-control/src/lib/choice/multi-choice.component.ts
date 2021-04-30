import { Component, ElementRef, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { FormControlService } from '../form-control.service';
import { isNumber, isPrimitive, Item } from '../primitive';
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
  set allowClear(v: boolean) {
    let value = v as unknown;
    if (value === '')
      value = true;
    if (value === null || value === undefined)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[allowClear] expects: boolean');
    this._allowClear = value;
  }
  _allowClear = true;

  @Input()
  get limit() {
    return this._limit;
  }
  set limit(value: number) {
    if (value === null || value === undefined)
      value = 0;
    if (!isNumber(value) || value < 0 || !Number.isInteger(value))
      throw new Error('[limit] expects: positive integer');
    this._limit = value;
    this.validation.next();
  }
  _limit = 0;

  _model: (boolean | number | string)[] = [];
  set model(value: (boolean | number | string)[]) {
    this._model = value;
    this.onChange(this._model.length === 0 ? null : this._model);
  }

  constructor(
    @Self() public ngControl: NgControl,
    public formControlService: FormControlService,
    hostElement: ElementRef,
  ) {
    super(hostElement);
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  get hostElementColorStyleHexString(): string {
    return this.formControlService.colorStyleHexString(this.hostElement.nativeElement);
  }

  onClick(item: Item) {
    this._model = this.removeInvalid();
    if (this._model.includes(item.key) === true) {
      if (this.required === true && this._model.length === 1)
        return;

      this.model = this._model.filter(key => key !== item.key);
      return;
    }
    this.model = [...this._model, item.key];
  }

  onChange(_value: (boolean | number | string)[] | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value === undefined)
      value = null;

    const isPrimitiveArray = Array.isArray(value)
      && value.every((item: any) => isPrimitive(item));

    if (value !== null && value !== undefined && !isPrimitiveArray)
      console.error('control value must be primitive array');

    if (value === undefined || value === null)
      value = [];

    this._model = value;
  }

  private removeInvalid() {
    return this._model.filter(key => this._items.map(item => item.key).includes(key));
  }

  private invalidValidator(items: Item[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && control.value.every((key: any) => !items.map(item => item.key).includes(key))
        ? { invalid: { value: control.value } }
        : null;
  }

  private limitValidator(limit: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && limit !== 0 && control.value.length > limit
        ? { limit: { value: control.value } }
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
