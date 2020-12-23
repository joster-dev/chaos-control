import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ControlDirective } from '../control.directive';
import { isMimeArray } from './is-mine.function';
import { mimeTypes } from './mime-types.const';
import { mime } from './mime.type';

@Component({
  selector: 'fc-file',
  templateUrl: './file.component.html',
  styleUrls: [
    './file.component.scss',
    '../atomic.scss',
    '../control.scss',
    '../input.scss'
  ]
})
export class FileComponent extends ControlDirective implements ControlValueAccessor {
  @Input() get acceptedTypes() {
    return this._acceptedTypes;
  }
  set acceptedTypes(value: unknown) {
    if (!isMimeArray(value))
      throw new Error(`sizeLimitMb input must be: ${mimeTypes.join(' | ')}`);
    this._acceptedTypes = value;
    this.validation.next();
  }
  // empty array is all types accepted
  _acceptedTypes: mime[] = [];

  @Input() get sizeLimitMb() {
    return this._sizeLimitMb;
  }
  set sizeLimitMb(value: unknown) {
    if (typeof value !== 'number')
      throw new Error('sizeLimitMb input must be: number');
    this._sizeLimitMb = value;
    this.validation.next();
  }
  // 0 is no size limit
  _sizeLimitMb = 0;

  @Input() get multiple() {
    return this._multiple === true;
  }
  set multiple(value: unknown) {
    this._multiple = value === true;
  }
  _multiple = false;

  @Input() showSize = false;

  model: '' | null = null;
  id = `${Math.random().toString(36).substr(2, 9)}`;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  get fileNames(): string {
    if (!this.ngControl.value || !(this.ngControl.value instanceof FileList))
      return '';
    return Object.values(this.ngControl.value).map(file => file.name).join(', ');
  }

  onFileChange(event: FileList): void {
    this.onChange(
      event.length === 0
        ? null
        : event
    );
  }

  onChange(_model: FileList | null) { }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: unknown): void {
    if (value === undefined)
      value = null;

    if (value !== null && !(value instanceof FileList))
      throw new Error('control value must be: File or null');

    // this.model = value;
  }

  private validate() {
    const validators: ValidatorFn[] = [];

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
