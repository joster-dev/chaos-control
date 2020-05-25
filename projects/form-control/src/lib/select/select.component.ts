import { KeyValue } from '@angular/common';
import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { FormControlService } from '../form-control.service';

@Component({
  selector: 'fc-select',
  templateUrl: './select.component.html',
  styleUrls: [
    './select.component.scss',
    '../atomic.scss'
  ],
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
  @Input() showIcon = true;
  @Input() items: KeyValue<null | boolean | number | string, string>[] = [];
  @Input() required = false;
  @Input() label?: string;
  @Input() placeholder?: string;

  dropdownMaxHeight = 200;
  isDisabled = false;
  searchTerm: string | null = null;
  error: 'required' | null = null;
  isDropdownCloseToBottom = false;

  constructor(private hostElement: ElementRef, private formControlService: FormControlService) { }

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

  _showDropdown = false;
  get showDropdown() {
    return this._showDropdown;
  }
  set showDropdown(value: boolean) {
    this._showDropdown = value;
    if (this._showDropdown === false) return;
    const hostBoundingRect: DOMRect = this.hostElement.nativeElement.getBoundingClientRect();
    this.isDropdownCloseToBottom = window.innerHeight < hostBoundingRect.bottom + this.dropdownMaxHeight;
  }

  _model: number | string | null = null;
  get model() {
    return this._model;
  }
  set model(value: number | string | null) {
    this._model = value;
    this.onChange(this._model);

    this._showDropdown = false;
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (this.hostElement.nativeElement.contains(event.target) === false)
      this._showDropdown = false;
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
    if (this._model === null && this.required === true) {
      this.error = 'required';
      return { required: true };
    }

    return null;
  }

  writeValue(value: any): void {
    if (value !== null && typeof value !== 'string' && typeof value !== 'number')
      throw new Error('control value must be string or number or null');

    // set _model instead of model to not trigger a change event
    this._model = value;
  }
}
