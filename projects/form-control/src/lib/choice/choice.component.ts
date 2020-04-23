import { Component, forwardRef, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { primitive } from '../../primitive.type';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ChoiceComponent)
    }
  ]
})
export class ChoiceComponent implements ControlValueAccessor {
  @Input() items: KeyValue<primitive, string>[] = [];
  @Input() required = false;
  @Input() label: string | null = null;

  isDisabled = false;
  _model: primitive | null = null;

  constructor(
    private formControlService: FormControlService,
    private hostElement: ElementRef
  ) { }

  set model(value: primitive | null) {
    this._model = value;
    this.onChange(value);
  }

  get isValid() {
    return this.hostElement.nativeElement.classList.contains('ng-invalid') === false;
  }

  onClick(item: KeyValue<primitive, string>) {
    if (this._model === item.key) {
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
    if (value === null || value === undefined) {
      this._model = null;
      return;
    }

    if (this.formControlService.isPrimitive(value) === false) {
      throw new Error('control value must be string, number, boolean or null');
    }

    this._model = value;
  }
}
