import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-text[name]',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextComponent),
      multi: true
    }
  ]
})
export class TextComponent implements ControlValueAccessor, Validator {
  @Input() nullDisplay = this.formControlService.nullDisplay;
  @Input() nullTitle = this.formControlService.nullTitle;
  @Input() showNull = this.formControlService.showNull;
  @Input() showIcon = true;
  // name is requied in @Component:selector
  @Input() name!: string;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() maxlength = 100;
  @Input() required = false;
  // todo: @Input() pattern

  isDisabled = false;
  error?: 'required' | 'maxlength';

  constructor(private formControlService: FormControlService) { }

  _model: string | null = null;
  get model() {
    return this._model;
  }
  set model(value: string | null) {
    if (value === '') value = null;
    this._model = value;
    this.onChange(this._model);
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched() { }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    if (this.model === null) {
      if (this.required === true) {
        this.error = 'required';
        return { required: true };
      }

      return null;
    }

    return null;
  }

  writeValue(value: any): void {
    if (value !== null && typeof value !== 'string') {
      throw new Error('control value must be string or null');
    }

    this._model = value;
  }
}
