import { Component, ElementRef, Input, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';

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
export class TextComponent implements ControlValueAccessor {
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
  get minlength() {
    return this._minlength;
  }
  set minlength(value: any) {
    if (typeof value !== 'number')
      throw new Error('minlength input must be: number');

    this._minlength = value;
    this.validate();
  }
  _minlength = 0;

  @Input()
  get maxlength() {
    return this._maxlength;
  }
  set maxlength(value: any) {
    if (typeof value !== 'number')
      throw new Error('maxlength input must be: number');

    this._maxlength = value;
    this.validate();
  }
  _maxlength = 100;

  @Input()
  get required() {
    return this._required;
  }
  set required(value: any) {
    if (!(value === null || value === '' || typeof value === 'boolean'))
      throw new Error('required input must be: boolean');

    this._required = value === '' || value === true;
    this.validate();
  }
  _required = false;

  @Input() label?: string;

  @ViewChild('textarea', { static: true }) textareaElement!: ElementRef;
  @ViewChild('textareaHidden', { static: true }) textareaHiddenElement!: ElementRef;

  isDisabled = false;
  _model: string | null = null;
  id = `_${Math.random().toString(36).substr(2, 9)}`;

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2
  ) {
    ngControl.valueAccessor = this;
  }

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

  onTouched() { }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value === '' || value === undefined)
      value = null;

    const isString = typeof value === 'string';
    if (value !== null) {
      if (typeof value === 'number')
        value = value.toString();

      if (isString && value.length > this.maxlength)
        value = value.substring(0, this.maxlength);
    }

    if (!(value === null || isString))
      throw new Error('control value must be: string');

    this._model = value;
    setTimeout(() => this.setTextareaHeight());
  }

  private validate() {
    const validators: ValidatorFn[] = [
      Validators.minLength(this.minlength),
      Validators.maxLength(this.maxlength)
    ];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
