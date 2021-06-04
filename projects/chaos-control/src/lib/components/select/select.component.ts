import { Component, ElementRef, HostListener, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ItemDirective } from '../../directives';
import { Item } from '../../models';

@Component({
  selector: 'jo-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends ItemDirective implements ControlValueAccessor {

  @Input() dropdownMaxHeight = '200px';

  set searchTerm(value: string) {
    this._searchTerm = value;
  }
  _searchTerm = '';

  get showDropdown() {
    return this._showDropdown;
  }
  set showDropdown(value: boolean) {
    this._showDropdown = value;
    if (this._showDropdown === false)
      return;
    const hostBoundingRect: DOMRect = this.hostElement.nativeElement.getBoundingClientRect();
    this.isDropdownCloseToBottom = window.innerHeight < hostBoundingRect.bottom + parseInt(this.dropdownMaxHeight, 10);
  }
  _showDropdown = false;

  isDropdownCloseToBottom = false;

  constructor(
    @Self() public ngControl: NgControl,
    private hostElement: ElementRef,
  ) {
    super(ngControl);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (!this.hostElement.nativeElement.contains(event.target))
      this._showDropdown = false;
  }

  onClick(item: Item) {
    this._model = this._model
      .filter(key => this._items.map(item => item.key).includes(key))

    if (this._model.includes(item.key)) {
      if (this.required === true && this._model.length === 1)
        return;

      this.model = this._model.filter(key => key !== item.key);
      return;
    }

    if (!this.isMultiple && this._model.length === 1) {
      this.model = [item.key];
      return;
    }

    this.model = [...this._model, item.key];
  }
}
