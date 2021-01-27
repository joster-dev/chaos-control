import { Directive, Input } from '@angular/core';

import { ControlDirective } from '../control.directive';
import { isItems, primitive } from '../primitive';
import { Item } from '../primitive/item.class';

@Directive({
  selector: '[fcChoice]'
})
export class ChoiceDirective extends ControlDirective {
  @Input()
  get items() {
    return this._items;
  }
  set items(value: Item[]) {
    if (!isItems(value))
      throw new Error('[items] expects: { key: primitive; value: string }[]');
    this._items = value;
    this.validation.next();
  }
  _items: Item[] = [];

  constructor() {
    super();
  }
}
