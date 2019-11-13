import { Component, forwardRef, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-select[name]',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss', '../styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, Validator {
  @Input() nullDisplay = this.formControlService.nullDisplay;
  @Input() nullTitle = this.formControlService.nullTitle;
  @Input() showNull = this.formControlService.showNull;
  @Input() items: KeyValue<number | string, string>[] = [];
  @Input() name!: string;
  @Input() label?: string;
  @Input() placeholder = '';
  @Input() required = false;

  @HostListener('document:mousedown', ['$event']) onGlobalClick(event: MouseEvent) {
    if (this.elementRef.nativeElement.contains(event.target) === false) {
      this.showDropdown = false;
    }
  }

  // controls
  isDisabled = false;
  _model: number | string | null = null;
  onChange = (_model: number | string | null) => { };
  onTouched = () => { };
  // display
  isActive = false;
  showDropdown = false;
  searchTerm: string | null = null;

  constructor(private elementRef: ElementRef, private formControlService: FormControlService) { }

  get selectText() {
    const item = this.items.find(item => this._model === item.key);
    return item ? item.value : this.placeholder;
  }

  get model() {
    return this._model;
  }

  set model(value: number | string | null) {
    this._model = value;
    this.onChange(this._model);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(): ValidationErrors | null {
    return null;
  }

  writeValue(value: any): void {
    if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('control value must be string or number or null')
    }

    this._model = value;
  }
}
