import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ToggleComponent)
    }
  ]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() nullDisplay = this.formControlService.nullDisplay;
  @Input() nullTitle = this.formControlService.nullTitle;
  @Input() showNull = this.formControlService.showNull;
  @Input() required = false;
  @Input() label?: string;
  @Input() trueDisplay = '👍';
  @Input() trueTitle = 'Yes';
  @Input() falseDisplay = '👎';
  @Input() falseTitle = 'No';

  isDisabled = false;
  _model: boolean | null = null;
  onChange = (_value: boolean | null) => { };
  onTouched = () => { };

  constructor(private formControlService: FormControlService) { }

  get model() {
    return this._model;
  }

  set model(value: boolean | null) {
    this._model = value;
    this.onChange(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any) {
    if (value !== null && typeof value !== 'boolean') {
      throw new Error('form control value must be boolean or null');
    }

    this._model = value;
  }
}
