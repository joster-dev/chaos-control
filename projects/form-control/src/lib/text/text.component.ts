import { Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { ControlDirective } from '../control.directive';

@Component({
  selector: 'fc-text',
  templateUrl: './text.component.html',
  styleUrls: [
    './text.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ]
})
export class TextComponent extends ControlDirective implements ControlValueAccessor {
  @Input()
  get placeholder() {
    if (this._placeholder === undefined)
      return '';

    return this._placeholder;
  }
  set placeholder(value: any) {
    if (typeof value !== 'string')
      throw new Error('placeholder input must be: string');

    this._placeholder = value;
  }
  _placeholder?: string;

  @Input()
  get minLength() {
    return this._minLength;
  }
  set minLength(value: any) {
    if (typeof value !== 'number')
      throw new Error('minLength input must be: number');

    this._minLength = value;
    this.validation.next();
  }
  _minLength = 0;

  @Input()
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(value: any) {
    if (typeof value !== 'number')
      throw new Error('maxLength input must be: number');

    this._maxLength = value;
    this.validation.next();
  }
  _maxLength = 0;

  @ViewChild('textarea', { static: true }) textareaElement!: ElementRef;
  @ViewChild('textareaHidden', { static: true }) textareaHiddenElement!: ElementRef;

  get model() {
    return this._model;
  }
  set model(value: string | null) {
    if (value === '')
      value = null;

    this._model = value;

    this.onChange(this._model);
    setTimeout(() => this.setTextareaHeight());
  }
  _model: string | null = null;

  id = `_${Math.random().toString(36).substr(2, 9)}`;

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2
  ) {
    super();
    this.validation.subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  setTextareaHeight() {
    const textarea = this.textareaElement.nativeElement as HTMLElement;
    const textareaHidden = this.textareaHiddenElement.nativeElement as HTMLElement;
    this.renderer.setStyle(textareaHidden, 'width', `calc(${textarea.scrollWidth}px - 1em)`);
    this.renderer.setStyle(textareaHidden, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', `${textareaHidden.scrollHeight}px`);
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    if (value === '' || value === undefined)
      value = null;

    if (typeof value === 'number')
      value = value.toString();

    if (!(value === null || typeof value === 'string'))
      throw new Error('control value must be: string');

    this._model = value;
    setTimeout(() => this.setTextareaHeight());
  }

  private maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && maxLength > 0 && control.value.length > maxLength
        ? { maxLength: control.value }
        : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      Validators.minLength(this.minLength),
      this.maxLengthValidator(this.maxLength)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
