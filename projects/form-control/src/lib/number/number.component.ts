import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { ControlConnector } from '../control-connector';

@Component({
  selector: 'fc-number',
  templateUrl: './number.component.html',
  styleUrls: [
    './number.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ]
})
export class NumberComponent extends ControlConnector implements ControlValueAccessor {
  @Input() min = 0;

  @Input()
  get max() {
    return this._max;
  }
  set max(value: any) {
    if (typeof value !== 'number')
      throw new Error('max input must be: number');
    this._max = value;
    this.validation.next();
  }
  _max = 9;

  @Input()
  get step() {
    return this._step;
  }
  set step(value: any) {
    if (typeof value !== 'number')
      throw new Error('step input must be: number');
    this._step = value;
    this.mustBeInteger = Number.isInteger(this._step);
  }
  _step = 1;

  _model: number | null = null;
  mustBeInteger = true;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation.subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

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

  onBeforeinput(event: InputEvent) {
    const test = this.mustBeInteger
      ? /\i*/
      : /\i*.\i*/;
    if (event.data !== null && test.test(event.data) === false)
      event.preventDefault();
  }

  add() {
    if (this.model === null) {
      this.model = this.max;
      return;
    }

    if (this.model + this.step < this.min) {
      this.model = this.min;
      return;
    }

    this.model += this.step;
  }

  subtract() {
    if (this.model === null) {
      this.model = this.min;
      return;
    }

    if (this.model - this.step > this.max) {
      this.model = this.max;
      return;
    }

    this.model -= this.step;
  }

  onChange(_model: number | null) { }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value === undefined)
      value = null;

    if (typeof value === 'string')
      value = parseFloat(value);

    if (!(value === null || typeof value === 'number' || isNaN(value)))
      throw new Error('control value must be number or null');

    this._model = value;
  }

  private validate() {

  }
}
