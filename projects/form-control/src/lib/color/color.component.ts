import { Component, Self, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  @ViewChild('input', { static: false }) inputElement!: ElementRef<HTMLInputElement>;

  _model = '#______';
  hex = /^[0-9A-Fa-f]{6}$/;
  selectionStart = 0;

  constructor(@Self() public ngControl: NgControl) {
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

  onClick(event: PointerEvent) {
    const ele = event.target as HTMLInputElement;
    if (ele.selectionStart === null || ele.selectionStart === 0) {
      this.selectionStart = 1;
      this.setSelection(ele);
    }
  }

  private setSelection(ele: HTMLInputElement) {
    setTimeout(() => {
      ele.selectionStart = ele.selectionEnd = this.selectionStart;
    });
  }

  onBeforeinput(event: InputEvent) {
    event.preventDefault();
    if (event.data === null || !/^[0-9A-Fa-f]{1,6}$/.test(event.data))
      return;

    const ele = event.target as HTMLInputElement;
    if (ele.selectionStart === null || ele.selectionStart === 0)
      return;
    this.selectionStart = ele.selectionStart;

    if (7 - this.selectionStart >= event.data.length) {
      this.model = this.model.substring(0, this.selectionStart)
        + event.data.toUpperCase()
        + this.model.substring(this.selectionStart + event.data.length, this.model.length);
      this.selectionStart = this.selectionStart + event.data.length;
      this.setSelection(ele);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const ele = event.target as HTMLInputElement;
    // console.log(ele.selectionStart);
    // console.log(ele.selectionEnd);
    const start = ele.selectionStart;
    if (ele.selectionStart !== null)
      this.selectionStart = ele.selectionStart;
    console.log(event.key);
    if (event.key === 'Home') {
      event.preventDefault();
      this.selectionStart = 1;
      this.setSelection(ele);
      return;
    }
    if (event.key === 'Delete') {
      if (ele.selectionStart === 0 || ele.selectionStart === 7)
        event.preventDefault();
      if (ele.selectionStart !== null && [1, 2, 3, 4, 5, 6].includes(ele.selectionStart)) {
        event.preventDefault();
        this.model = this.model.substring(0, ele.selectionStart)
          + '_'
          + this.model.substring(ele.selectionStart + 1, this.model.length);
        this.setSelection(ele);
      }
      return;
    }
    if (event.key === 'Backspace') {
      if (ele.selectionStart === 1)
        event.preventDefault();
      if (ele.selectionStart !== null && [2, 3, 4, 5, 6, 7].includes(ele.selectionStart)) {
        event.preventDefault();
        this.selectionStart = ele.selectionStart - 1;
        this.model = this.model.substring(0, this.selectionStart)
          + '_'
          + this.model.substring(this.selectionStart + 1, this.model.length);
        this.setSelection(ele);
      }
      return;
    }
    if (event.key === 'ArrowUp') {
      if (ele.selectionStart !== null) {
        if ([1, 2].includes(ele.selectionStart))
          this.add(0);
        if ([3, 4].includes(ele.selectionStart))
          this.add(1);
        if ([5, 6, 7].includes(ele.selectionStart))
          this.add(2);
        this.setSelection(ele);
        // ele.setSelectionRange(1, 3, 'backward');
      }
      event.preventDefault();
    }
    if (event.key === 'ArrowDown') {
      if (ele.selectionStart !== null) {
        if ([1, 2].includes(ele.selectionStart))
          this.subtract(0);
        if ([3, 4].includes(ele.selectionStart))
          this.subtract(1);
        if ([5, 6, 7].includes(ele.selectionStart))
          this.subtract(2);
        this.setSelection(ele);
      }
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft' && ele.selectionStart === 1)
      event.preventDefault();
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: any) {
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

  // private toHexString(value: number, length = 2) {
  //   let result = value.toString(16).toUpperCase();
  //   while (result.length < length)
  //     result = `0${result}`;
  //   return result;
  // }

  private add(part: 0 | 1 | 2) {
    const idx = part * 2 + 1;
    let int = parseInt(this.model.substring(idx, idx + 2), 16);
    if (int === 255)
      return;
    if (isNaN(int))
      int = 0;
    const newValue = int + 1;
    this.model = this.model.substring(0, idx)
      + this.toHexString(newValue)
      + this.model.substring(idx + 2, this.model.length);
  }

  private subtract(part: 0 | 1 | 2) {
    const idx = part * 2 + 1;
    let int = parseInt(this.model.substring(idx, idx + 2), 16);
    if (int === 0)
      return;
    if (isNaN(int))
      int = parseInt('FF', 16);
    const newValue = int - 1;
    this.model = this.model.substring(0, idx)
      + this.toHexString(newValue)
      + this.model.substring(idx + 2, this.model.length);
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

  private toHexString(value: number, length = 2) {
    let result = value.toString(16).toUpperCase();
    while (result.length < length)
      result = `0${result}`;
    return result;
  }
}
