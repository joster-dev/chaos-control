import { booleanAttribute, Component, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IconComponent } from '@joster-dev/icon';
import { ControlDirective } from '../../directives';
import { isNumber } from '../../models';

function toAcceptedTypes(value: string[]): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string'))
    throw new Error(`acceptedTypes expects: string[]`);
  return value;
}

function toSizeLimitMb(value: number): number {
  if (!isNumber(value) || value < 0)
    throw new Error('sizeLimitMb expects: positive number');
  return value;
}

@Component({
    selector: 'cc-file',
    templateUrl: './file.component.html',
    styleUrls: [
        './file.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, IconComponent]
})
export class FileComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  acceptedTypes = input([] as string[], { transform: toAcceptedTypes });
  sizeLimitMb = input(0, { transform: toSizeLimitMb });
  multiple = input(false, { transform: booleanAttribute });
  showSize = input(false, { transform: booleanAttribute });

  model = signal<'' | null>(null);
  id = `${Math.random().toString(36).substr(2, 9)}`;

  constructor() {
    super();
    this.ngControl.valueAccessor = this;

    effect(() => {
      this.acceptedTypes();
      this.sizeLimitMb();
      this.multiple();
      this.required();
      this.validate();
    });
  }

  get fileNames(): string {
    if (this.ngControl.value instanceof FileList)
      return Object.values(this.ngControl.value).map(file => file.name).join(', ');

    if (this.ngControl.value instanceof File)
      return this.ngControl.value.name;

    return '';
  }

  get sizeLimit(): string {
    return this.sizeLimitMb() < 1
      ? `${this.sizeLimitMb() * 1000} KB`
      : `${this.sizeLimitMb()} MB`;
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onChange(
      target.files?.length
        ? target.files
        : null
    );
  }

  onFileCancel(): void {
    this.onChange(null);
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
    // todo
    // this.model.set(value);
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
    return (control: AbstractControl): ValidationErrors | null => control.value instanceof FileList
      && Object.values(control.value).map(item => item.size / 1024 / 1024)
        .reduce((acc, cur) => acc + cur, 0) > sizeLimitMb
      ? { sizeLimitMb: { value: control.value } }
      : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(this.multiple())
    ];

    if (this.acceptedTypes().length > 0)
      validators.push(this.acceptedTypesValidator(this.acceptedTypes()));

    if (this.sizeLimitMb() > 0)
      validators.push(this.sizeLimitMbValidator(this.sizeLimitMb()));

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
