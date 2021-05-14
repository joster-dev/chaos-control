import { Component, ElementRef, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormControlService } from '../form-control.service';
import { debounceTime } from 'rxjs/operators';

import { ControlDirective } from '../control.directive';

@Component({
  selector: 'fc-color',
  templateUrl: './color.component.html',
  styleUrls: [
    './color.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ]
})
export class ColorComponent extends ControlDirective implements ControlValueAccessor {
  _model = '#______';
  hex = /^[0-9A-Fa-f]{6}$/;
  selectionStart = 0;

  constructor(
    @Self() public ngControl: NgControl,
    public formControlService: FormControlService,
  ) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  get value(): string | null {
    if (this.ngControl.control === null)
      throw new Error('control is null');
    return this.ngControl.control.value;
  }

  get squareFill() {
    if (this.value !== null && this.hex.test(this.value))
      return this.value;
    return null;
  }

  get model() {
    return this._model;
  }
  set model(value: string) {
    const removeHash = value.substr(1);
    this._model = value;
    this.onChange(this.hex.test(removeHash) ? removeHash : null);
  }

  onChangeColor(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.model = value.toUpperCase();
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    const isHex = this.hex.test(value);
    if (value === undefined || value === null || !isHex)
      value = '#______';

    if (typeof value !== 'string')
      throw new Error('control value must be: string');

    if (isHex)
      value = `#${value}`;

    this._model = value;
  }

  private invalidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && this.hex.test(control.value) === false
        ? { invalid: control.value }
        : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator()
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
