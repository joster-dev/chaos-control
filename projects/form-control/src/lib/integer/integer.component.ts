import { Component, forwardRef, Input, ElementRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IntegerComponent)
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntegerComponent),
      multi: true
    }
  ]
})
export class IntegerComponent implements ControlValueAccessor, Validator {
  @Input() nullDisplay = this.formControlService.nullDisplay;
  @Input() nullTitle = this.formControlService.nullTitle;
  @Input() showNull = this.formControlService.showNull;
  @Input() showValidationErrors = this.formControlService.showValidationErrors;
  @Input() name: string | null = null;
  @Input() label: string | null = null;
  @Input() addDisplay = '➕';
  @Input() addTitle = 'Add';
  @Input() subtractDisplay = '➖';
  @Input() subtractTitle = 'Subtract';
  @Input() min = 0;
  @Input() max = 9;
  @Input() step = 1;
  @Input() required = false;

  isDisabled = false;
  error: 'required' | 'min' | 'max' | null = null;
  _model: number | null = null;

  constructor(private hostElement: ElementRef, private formControlService: FormControlService) { }

  get model() {
    return this._model;
  }

  set model(value: number | null) {
    this._model = value;
    this.onChange(this._model);
  }

  get isDisabledAdd() {
    if (this.isDisabled === true) return true;

    if (this.model === null) return false;

    return this.model + this.step > this.max;
  }

  get isDisabledSubtract() {
    if (this.isDisabled === true) return true;

    if (this.model === null) return false;

    return this.model - this.step < this.min;
  }

  get isInvalid() {
    return this.hostElement.nativeElement.classList.contains('ng-invalid');
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
    if (value !== null && typeof value !== 'number') {
      throw new Error('control value must be number or null');
    }

    this._model = value;
  }
}
