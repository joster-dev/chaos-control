import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

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
  @Input() max = 9;
  @Input() step = 1;

  _model: number | null = null;

  constructor() {
    super()
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
    if (value === null || value === undefined) {
      this._model = null;
      return;
    }

    if (typeof value !== 'number')
      throw new Error('control value must be number or null');

    this._model = value;
  }
}
