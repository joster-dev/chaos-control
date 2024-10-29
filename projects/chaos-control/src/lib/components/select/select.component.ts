import { Component, ElementRef, HostBinding, HostListener, Input, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ItemDirective } from '../../directives';
import { Item } from '../../models';

@Component({
  selector: 'jo-select',
  templateUrl: './select.component.html',
  styleUrls: [
    './select.component.scss',
    '../../styles.scss',
  ]
})
export class SelectComponent extends ItemDirective implements ControlValueAccessor {
  @ViewChild('dropGroup') dropGroup!: ElementRef<HTMLDivElement>;
  @ViewChild('dropup') dropup!: ElementRef<HTMLDialogElement>;
  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDialogElement>;

  @Input()
  @HostBinding('style.--dropHeightPx')
  dropHeightPx = 200;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredItems = value
      ? this._items.filter(item => item.value.toLowerCase().includes(value.toLowerCase()))
      : this._items;
  }
  _searchTerm = '';

  isDropdownCloseToBottom = false;
  id = `${Math.random().toString(36).substr(2, 9)}`;

  constructor(
    @Self() public override ngControl: NgControl,
    private hostElement: ElementRef,
  ) {
    super(ngControl);
  }

  get activeItemValues(): string {
    return this._items
      .filter(item => this._model.includes(item.key))
      .map(item => item.value)
      .join(', ');
  }

  get isSelectedAll(): boolean {
    return this._items.every(item => this._model.includes(item.key));
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (!this.hostElement.nativeElement.contains(event.target))
      this.closeDropdown();
  }

  onClickGroup() {
    this.closeDropdown();
    if (this.dropGroup.nativeElement.getBoundingClientRect().bottom + this.dropHeightPx > window.innerHeight) {
      this.dropup.nativeElement.show();
    } else {
      this.dropdown.nativeElement.show();
    }
  }

  onClick(item: Item) {
    this._model = this._model.filter(key => this._items.map(item => item.key).includes(key))

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

  onClickSelectAll() {
    this.model = this.isSelectedAll
      ? []
      : this._items.map(item => item.key);
  }

  closeDropdown() {
    this.searchTerm = '';
    this.dropdown.nativeElement.close();
    this.dropup.nativeElement.close();
  }
}
