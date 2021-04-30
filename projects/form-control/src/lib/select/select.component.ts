import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, ValidationErrors } from '@angular/forms';
import { Item } from '../primitive';
import { ControlDirective } from '../control.directive';
import { primitive } from '../primitive';

@Component({
  selector: 'fc-select',
  templateUrl: './select.component.html',
  styleUrls: [
    './select.component.scss',
    '../atomic.scss'
  ]
})
export class SelectComponent extends ControlDirective implements ControlValueAccessor {
  @Input() nullDisplay = 'Unknown';
  @Input() nullTitle = '❓';
  @Input() showNull = false;
  @Input() showIcon = true;
  @Input() items: Item[] = [];
  @Input() label?: string;
  @Input() placeholder?: string;

  dropdownMaxHeight = 200;
  isDisabled = false;
  searchTerm: string | null = null;
  error: 'required' | null = null;
  isDropdownCloseToBottom = false;

  constructor(
    public hostElement: ElementRef
  ) {
    super(hostElement);
  }

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
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
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

  writeValue(value: primitive | null): void {
    if (value !== null && typeof value !== 'string' && typeof value !== 'number')
      throw new Error('control value must be string or number or null');

    // set _model instead of model to not trigger a change event
    this._model = value;
  }
}
