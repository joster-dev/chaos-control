import { booleanAttribute, Component, effect, ElementRef, HostListener, inject, input, OnDestroy, output, Renderer2, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ControlDirective } from '../../directives';
import { isNumber } from '../../models';

function toPlaceholder(value: string): string {
  if (typeof (value as unknown) !== 'string')
    throw new Error('[placeholder] expects: string');
  return value;
}

function toLength(label: string) {
  return (value: string | number | null | undefined): number | null => {
    if (typeof value === 'string')
      value = parseInt(value, 10);
    if (value === undefined)
      value = null;
    if (!isNumber(value) || value < 0 || !Number.isInteger(value) || value === null)
      throw new Error(`[${label}] expects: positive integer`);
    return value;
  };
}

@Component({
    selector: 'jo-text',
    templateUrl: './text.component.html',
    styleUrls: [
        './text.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class TextComponent extends ControlDirective implements OnDestroy, ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });
  private renderer = inject(Renderer2);

  placeholder = input('', { transform: toPlaceholder });
  minLength = input<number | null, string | number | null | undefined>(null, { transform: toLength('minLength') });
  maxLength = input<number | null, string | number | null | undefined>(null, { transform: toLength('maxLength') });
  isSpellCheck = input(false, { transform: booleanAttribute });
  isGrow = input(false, { transform: booleanAttribute });
  rows = input(3);

  onBlur = output<FocusEvent>();
  onFocus = output<FocusEvent>();

  textareaElement = viewChild<ElementRef>('textarea');
  textareaHiddenElement = viewChild<ElementRef>('textareaHidden');

  model = signal<string | null>(null);
  id = `_${Math.random().toString(36).substring(2, 11)}`;
  resizeSubject = new Subject<void>();

  constructor() {
    super();
    this.ngControl.valueAccessor = this;
    this.resizeSubject
      .pipe(debounceTime(300))
      .subscribe(() => this.isGrow() && this.setTextareaHeight());

    effect(() => {
      this.minLength();
      this.maxLength();
      this.required();
      this.validate();
    });
  }

  ngOnDestroy(): void {
    this.resizeSubject.complete();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeSubject.next();
  }

  setTextareaHeight() {
    const textareaRef = this.textareaElement();
    const textareaHiddenRef = this.textareaHiddenElement();
    if (!textareaRef || !textareaHiddenRef)
      return;
    const textarea = textareaRef.nativeElement as HTMLElement;
    const textareaHidden = textareaHiddenRef.nativeElement as HTMLElement;
    this.renderer.setStyle(textareaHidden, 'width', `calc(${textarea.scrollWidth}px - 1em)`);
    this.renderer.setStyle(textareaHidden, 'height', 'auto');
    this.renderer.setStyle(textarea, 'height', `${textareaHidden.scrollHeight}px`);
  }

  onModelChange(value: string | null) {
    this.setModel(value);
  }

  private setModel(value: string | null) {
    if (value === '')
      value = null;

    this.model.set(value);
    this.onChange(value);
    setTimeout(() => this.setTextareaHeight());
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
      this.model.set(value);
      setTimeout(() => this.setTextareaHeight());
    }
  }

  private validate() {
    const validators: ValidatorFn[] = [];

    const minLength = this.minLength();
    if (minLength != null)
      validators.push(Validators.minLength(minLength));

    const maxLength = this.maxLength();
    if (maxLength != null)
      validators.push(Validators.maxLength(maxLength));

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
