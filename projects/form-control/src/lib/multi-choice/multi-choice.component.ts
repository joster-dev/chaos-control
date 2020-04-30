import { Component, Input, ElementRef, forwardRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FormControlService } from '../form-control.service';
import { primitive } from '../primitive.type';

@Component({
  selector: 'fc-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultiChoiceComponent)
    }
  ]
})
export class MultiChoiceComponent implements ControlValueAccessor {
  @Input() items: KeyValue<primitive, string>[] = [];
  @Input() required = false;
  @Input() label: string | null = null;
  @Input() allowClear = true;

  isDisabled = false;
  _model: primitive[] = [];

  constructor(
    private formControlService: FormControlService,
    private hostElement: ElementRef
  ) { }

  set model(value: primitive[]) {
    this._model = value;
    this.onChange(this._model.length === 0 ? null : this._model);
  }

  get isValid() {
    return this.hostElement.nativeElement
      .classList.contains('ng-invalid') === false;
  }

  onClick(item: KeyValue<primitive, string>) {
    if (this._model.includes(item.key) === true) {
      this.model = this._model.filter(i => i !== item.key);
      return;
    }
    this.model = [...this._model, item.key];
  }

  onChange(_value: primitive[] | null) { }
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
    if (value === null || value === undefined) {
      this._model = [];
      return;
    }

    if (Array.isArray(value) === false)
      throw new Error('control value must be array');
    debugger;
    if (value.every((item: any) => this.formControlService.isPrimitive(item) === true) === false)
      throw new Error('control values must be string, number, boolean or null');

    this._model = value;
  }
}
