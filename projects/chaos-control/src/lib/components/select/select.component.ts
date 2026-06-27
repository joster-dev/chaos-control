import { Component, computed, ElementRef, HostListener, inject, input, numberAttribute, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { IconComponent } from '@joster-dev/icon';
import { ItemDirective } from '../../directives';
import { Item } from '../../models';

@Component({
    selector: 'cc-select',
    templateUrl: './select.component.html',
    styleUrls: [
        './select.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    host: {
        '[style.--dropHeightPx]': 'dropHeightPx()',
    },
    imports: [FormsModule, NgTemplateOutlet, IconComponent]
})
export class SelectComponent extends ItemDirective implements ControlValueAccessor {
  private hostElement = inject(ElementRef);

  dropGroup = viewChild.required<ElementRef<HTMLDivElement>>('dropGroup');
  dropup = viewChild.required<ElementRef<HTMLDialogElement>>('dropup');
  dropdown = viewChild.required<ElementRef<HTMLDialogElement>>('dropdown');

  dropHeightPx = input(200, { transform: numberAttribute });
  searchPlaceholder = input('Search');

  searchTerm = signal('');

  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return term
      ? this.items().filter(item => item.value.toLowerCase().includes(term))
      : this.items();
  });

  isDropdownCloseToBottom = false;
  id = `${Math.random().toString(36).substr(2, 9)}`;

  activeItemValues = computed(() => this.items()
    .filter(item => this.model().includes(item.key))
    .map(item => item.value)
    .join(', '));

  isSelectedAll = computed(() => this.items().every(item => this.model().includes(item.key)));

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (!this.hostElement.nativeElement.contains(event.target))
      this.closeDropdown();
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  onClickGroup() {
    this.closeDropdown();
    if (this.dropGroup().nativeElement.getBoundingClientRect().bottom + this.dropHeightPx() > window.innerHeight) {
      this.dropup().nativeElement.show();
    } else {
      this.dropdown().nativeElement.show();
    }
  }

  onClick(item: Item) {
    const keys = this.items().map(item => item.key);
    const model = this.model().filter(key => keys.includes(key));

    if (model.includes(item.key)) {
      if (this.required() === true && model.length === 1)
        return;

      this.setModel(model.filter(key => key !== item.key));
      return;
    }

    if (!this.isMultiple() && model.length === 1) {
      this.setModel([item.key]);
      return;
    }

    this.setModel([...model, item.key]);
  }

  onClickSelectAll() {
    this.setModel(this.isSelectedAll()
      ? []
      : this.items().map(item => item.key));
  }

  onFocusOut(event: FocusEvent, dialog: HTMLDialogElement) {
    if (!dialog.contains(event.relatedTarget as Node | null))
      this.closeDropdown();
  }

  closeDropdown() {
    this.searchTerm.set('');
    this.dropdown().nativeElement.close();
    this.dropup().nativeElement.close();
  }
}
