import { Component, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ControlDirective } from '../../directives';
import { isNumber } from '../../models';

@Component({
  selector: 'jo-number',
  templateUrl: './number.component.html',
  styleUrls: [
    './number.component.scss',
    '../../styles.scss',
  ]
})
export class NumberComponent extends ControlDirective implements ControlValueAccessor {
  @Input()
  get min() {
    return this._min;
  }
  set min(value: number) {
    if (!isNumber(value))
      throw new Error('[min] expects: number');
    this._min = value;
    this.validation.next();
  }
  _min = 0;

  @Input()
  get max() {
    return this._max;
  }
  set max(value: number) {
    if (!isNumber(value))
      throw new Error('[max] expects: number');
    this._max = value;
    this.validation.next();
  }
  _max = 9;

  @Input()
  get step() {
    return this._step;
  }
  set step(value: number) {
    if (!isNumber(value))
      throw new Error('[step] expects: number');
    this._step = value;
    this.mustBeInteger = Number.isInteger(this._step);
  }
  _step = 1;

  mustBeInteger = true;
  readonly sizePadding = 5;

  constructor(
    @Self() public ngControl: NgControl,
  ) {
    super();
    this.validation.subscribe(() => this.validate());
    this.validation.next();
    ngControl.valueAccessor = this;
  }

  _model: number | null = null;
  get model() {
    return this._model;
  }
  set model(value: number | null) {
    this._model = value;
    this.onChange(this._model);
  }

  get isDisabledAdd() {
    return this.isDisabled === true
      || this.model !== null
      && this.model + this.step > this.max;
  }

  get isDisabledSubtract() {
    return this.isDisabled === true
      || this._model !== null
      && this._model - this.step < this.min;
  }

  get maxDigitSize() {
    return Math.max(
      this._step.toString().length,
      this._max.toString().length,
      this._min.toString().length
    );
  }

  onBeforeinput(e: Event) {
    const event = e as InputEvent;
    if (event.data === null)
      return;
    const isDigit = /\d/.test(event.data);
    const isMinus = event.data === '-';
    const isMinusAllowed = this.min < 0;
    const isBlockedNonDigit = !isDigit && !(isMinus && isMinusAllowed)
    const isPastMax = Number((this._model || '') + event.data) > this.max;
    if (isBlockedNonDigit || isPastMax)
      event.preventDefault();
  }

  add(e: HTMLInputElement) {
    if (this.model === null) {
      this.model = this.max;
      return;
    }

    e.stepUp();
    this.model = e.valueAsNumber;
  }

  subtract(e: HTMLInputElement) {
    if (this.model === null) {
      this.model = this.min;
      return;
    }

    e.stepDown();
    this.model = e.valueAsNumber;
  }

  onChange(_model: number | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: number | null) {
    if (value === undefined)
      value = null;

    if (typeof value === 'string')
      value = parseFloat(value);

    if (value === null || isNumber(value))
      this._model = value;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      Validators.min(this.min),
      Validators.max(this.max)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
