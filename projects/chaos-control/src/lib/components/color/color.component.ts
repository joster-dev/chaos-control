import { Component, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ControlDirective } from '../../directives';

@Component({
  selector: 'jo-color',
  templateUrl: './color.component.html',
  styleUrls: [
    './color.component.scss',
    '../../atomic.scss',
    '../../styles.scss',
  ]
})
export class ColorComponent extends ControlDirective implements ControlValueAccessor {
  private partialHex = /^[0-9A-Fa-f]{1,6}$/;
  fullHex = /^[0-9A-Fa-f]{6}$/;

  get model() {
    return this._model;
  }
  set model(value: string | null) {
    this._model = value;
    this.onChange(
      this._model !== null && this.fullHex.test(this._model)
        ? this._model
        : null
    );
  }
  _model: string | null = null;

  id = `_${Math.random().toString(36).substring(2, 11)}`;

  constructor(
    @Self() public ngControl: NgControl,
  ) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  onChangeColor(event: Event) {
    const ele = event.target as HTMLInputElement;
    this.model = ele.value.substring(1).toUpperCase();
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  onBeforeinput(e: Event): void {
    const event = e as InputEvent;
    if (event.data === null)
      return;
    const ele = event.target as HTMLInputElement;
    const tooLong = event.data.length + (ele.selectionStart || 0) > 6;
    const valid = this.partialHex.test(event.data);
    if (tooLong || !valid)
      event.preventDefault();
  }

  writeValue(value: string | null): void {
    if (value === undefined || typeof value !== 'string' || !this.partialHex.test(value))
      value = null;

    if (value === null || this.partialHex.test(value))
      this._model = value;
  }

  private invalidValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && (typeof control.value !== 'string' || !this.fullHex.test(control.value))
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
