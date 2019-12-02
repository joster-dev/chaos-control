import { Component, forwardRef, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-select',
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
  @Input() showArrow = true;
  @Input() items: KeyValue<number | string, string>[] = [];
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required = false;

  isDisabled = false;
  showDropdown = false;
  searchTerm: string | null = null;
  error?: 'required';

  constructor(private elementRef: ElementRef, private formControlService: FormControlService) { }

  get hasSelected() {
    return this.items.some(item => this.model === item.key);
  }

  get selectedValue() {
    const selected = this.items.find(item => this.model === item.key);
    if (selected === undefined) throw new Error('hasSelected: must be true');
    return selected.value;
  }

  get placeholderText() {
    const selectItem = this.items.find(item => this.model === item.key);
    return selectItem ? selectItem.value : this.placeholder;
  }

  _model: number | string | null = null;
  get model() {
    return this._model;
  }
  set model(value: number | string | null) {
    this._model = value;
    this.onChange(this._model);

    this.showDropdown = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (this.elementRef.nativeElement.contains(event.target) === false) {
      this.showDropdown = false;
    }
  }

  onChange(_model: number | string | null) { }
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

  validate(): ValidationErrors | null {
    return null;
  }

  writeValue(value: any): void {
    if (value !== null && typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('control value must be string or number or null');
    }

    // set _model instead of model to not trigger a change event
    this._model = value;
  }
}
