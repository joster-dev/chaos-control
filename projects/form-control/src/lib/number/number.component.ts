import { Component, ElementRef, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-number',
  templateUrl: './number.component.html',
  styleUrls: [
    './number.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberComponent),
      multi: true
    }
  ]
})
export class NumberComponent implements ControlValueAccessor, Validator, OnChanges {
  @Input() showValidationErrors = this.formControlService.showValidationErrors;
  @Input() label: string | null = null;
  @Input() min = 0;
  @Input() max = 9;
  @Input() step = 1;
  @Input() required = false;

  isDisabled = false;
  error: 'required' | 'min' | 'max' | null = null;
  _model: number | null = null;

  constructor(private hostElement: ElementRef, private formControlService: FormControlService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const min = changes.min;
    const isMinChange = min !== undefined
      && min.firstChange === false
      && min.currentValue !== min.previousValue;
    const max = changes.max;
    const isMaxChange = max !== undefined
      && max.firstChange === false
      && max.currentValue !== max.previousValue;
    if (isMinChange === true || isMaxChange === true)
      this.onChange(this._model);
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

  get isValid() {
    return this.hostElement.nativeElement
      .classList.contains('ng-invalid') === false;
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

  onTouched() { }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    if (this._model === null && this.required === true) {
      this.error = 'required';
      return { required: true };
    }

    if (this._model !== null && this._model > this.max) {
      this.error = 'max';
      return { max: true };
    }

    if (this._model !== null && this._model < this.min) {
      this.error = 'min';
      return { min: true };
    }

    this.error = null;
    return null;
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
