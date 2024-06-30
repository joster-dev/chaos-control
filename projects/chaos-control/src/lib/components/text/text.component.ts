import { Component, ElementRef, HostListener, Input, OnDestroy, Output, Renderer2, Self, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ControlDirective } from '../../directives';
import { isNumber } from '../../models';

@Component({
  selector: 'jo-text',
  templateUrl: './text.component.html',
  styleUrls: [
    './text.component.scss',
    '../../atomic.scss',
    '../../styles.scss',
  ]
})
export class TextComponent extends ControlDirective implements OnDestroy, ControlValueAccessor {
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(v: string) {
    const value = v as unknown;
    if (typeof value !== 'string')
      throw new Error('[placeholder] expects: string');
    this._placeholder = value;
  }
  _placeholder = '';

  @Input()
  get minLength() {
    return this._minLength;
  }
  set minLength(value: string | number | null | undefined) {
    if (typeof value === 'string')
      value = parseInt(value, 10);
    if (value === undefined)
      value = null;
    if (!isNumber(value) || value < 0 || !Number.isInteger(value) || value === null)
      throw new Error('[minLength] expects: positive integer');
    this._minLength = value;
    this.validation.next();
  }
  _minLength: number | null = null;

  @Input()
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(value: string | number | null | undefined) {
    if (typeof value === 'string')
      value = parseInt(value, 10);
    if (value === undefined)
      value = null;
    if (!isNumber(value) || value < 0 || !Number.isInteger(value) || value === null)
      throw new Error('[maxLength] expects: positive integer');
    this._maxLength = value;
    this.validation.next();
  }
  _maxLength: number | null = null;

  @Input()
  isSpellCheck = false;

  @Input()
  set isGrow(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[isGrow] expects: boolean');
    this._isGrow = value;
  }
  _isGrow = false;

  @Input() rows = 3;

  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();

  @ViewChild('textarea') textareaElement?: ElementRef;
  @ViewChild('textareaHidden') textareaHiddenElement?: ElementRef;

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

  id = `_${Math.random().toString(36).substring(2, 11)}`;
  resizeSubject = new Subject<void>();

  constructor(
    @Self() public ngControl: NgControl,
    private renderer: Renderer2,
  ) {
    super();
    this.validation.subscribe(() => this.validate());
    ngControl.valueAccessor = this;
    this.resizeSubject
      .pipe(debounceTime(300))
      .subscribe(() => this._isGrow && this.setTextareaHeight());
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeSubject.complete();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeSubject.next();
  }

  setTextareaHeight() {
    if (!this.textareaElement || !this.textareaHiddenElement)
      return;
    const textarea = this.textareaElement.nativeElement as HTMLElement;
    const textareaHidden = this.textareaHiddenElement.nativeElement as HTMLElement;
    this.renderer.setStyle(textareaHidden, 'width', `calc(${textarea.scrollWidth}px - 1em)`);
    this.renderer.setStyle(textareaHidden, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', `${textareaHidden.scrollHeight}px`);
  }

  onChange(_model: string | null) { }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  writeValue(v: string | null): void {
    let value = v as unknown;
    if (value === '' || value === undefined)
      value = null;
    if (isNumber(value))
      value = value.toString();
    if (value === null || typeof value === 'string') {
      this._model = value;
      setTimeout(() => this.setTextareaHeight());
    }
  }

  private validate() {
    const validators: ValidatorFn[] = [];

    if (this._minLength != null)
      validators.push(Validators.minLength(this._minLength));

    if (this._maxLength != null)
      validators.push(Validators.maxLength(this._maxLength));

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
