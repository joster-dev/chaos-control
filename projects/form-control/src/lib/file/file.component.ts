import { Component, ElementRef, Input, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { ControlDirective } from '../control.directive';
import { FormControlService } from '../form-control.service';
import { isNumber } from '../primitive';

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
  set acceptedTypes(value: string[]) {
    if (!Array.isArray(value) || !value.every(item => typeof item === 'string'))
      throw new Error(`[acceptedTypes] expects: string[]`);
    this._acceptedTypes = value;
    this.validation.next();
  }
  _acceptedTypes: string[] = [];

  @Input() get sizeLimitMb() {
    return this._sizeLimitMb;
  }
  set sizeLimitMb(value: number) {
    if (!isNumber(value) || value < 0)
      throw new Error('[sizeLimitMb] expects: positive number');
    this._sizeLimitMb = value;
    this.validation.next();
  }
  _sizeLimitMb = 0;

  @Input() get multiple() {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = value === true;
    this.validation.next();
  }
  _multiple = false;

  @Input() showSize = false;

  model: '' | null = null;
  id = `${Math.random().toString(36).substr(2, 9)}`;

  constructor(
    @Self() public ngControl: NgControl,
    private formControlService: FormControlService,
    hostElement: ElementRef,
  ) {
    super(hostElement);
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  get fileNames(): string {
    if (this.ngControl.value instanceof FileList)
      return Object.values(this.ngControl.value).map(file => file.name).join(', ');

    if (this.ngControl.value instanceof File)
      return this.ngControl.value.name;

    return '';
  }

  get sizeLimit(): string {
    return this.sizeLimitMb < 1
      ? `${this.sizeLimitMb * 1000} KB`
      : `${this.sizeLimitMb} MB`;
  }

  get hostElementColorStyleHexString(): string {
    return this.formControlService.colorStyleHexString(this.hostElement.nativeElement);
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onChange(
      target.files?.length
        ? target.files
        : null
    );
  }

  onChange(_model: FileList | null) { }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  writeValue(value: unknown): void {
    if (value === undefined)
      value = null;

    if (value !== null && !(value instanceof FileList))
      throw new Error('control value must be: File or null');

    // this.model = value;
  }

  private acceptedTypesValidator(acceptedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => control.value !== null
      && control.value instanceof FileList
      && !Object.values(control.value).map(item => item.type.toLowerCase())
        .every(type => acceptedTypes.includes(type.toLowerCase()))
      ? { acceptedTypes: { value: control.value } }
      : null;
  }

  private invalidValidator(multiple: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => control.value !== null
      && (!(control.value instanceof FileList) || (control.value.length > 1 && !multiple))
      ? { invalid: { value: control.value } }
      : null;
  }

  private sizeLimitMbValidator(sizeLimitMb: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => control.value !== null
      && control.value instanceof FileList
      && Object.values(control.value).map(item => item.size / 1024 / 1024)
        .reduce((acc, cur) => acc + cur, 0) > sizeLimitMb
      ? { sizeLimitMb: { value: control.value } }
      : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(this.multiple)
    ];

    if (this.acceptedTypes.length > 0)
      validators.push(this.acceptedTypesValidator(this.acceptedTypes));

    if (this.sizeLimitMb > 0)
      validators.push(this.sizeLimitMbValidator(this.sizeLimitMb));

    if (this.required === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
