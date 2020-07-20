import { Directive, Input } from '@angular/core';
import { KeyValue } from '@angular/common';

import { ControlDirective } from '../control.directive';
import { primitive } from '../primitive';
import { isPrimitive } from '../primitive';

@Directive({
  selector: '[fcChoice]'
})
export class ChoiceDirective extends ControlDirective {
  @Input()
  get items() {
    return this._items;
  }
  set items(value: any) {
    if (!this.isItems(value))
      throw new Error('items input must be: KeyValue<primitive, string>[]');

    this._items = value;
    this.validation.next();
  }
  _items: KeyValue<primitive, string>[] = [];

  constructor() {
    super();
  }

  private isItems(value: any): value is KeyValue<primitive, string>[] {
    return Array.isArray(value)
      && value.every((item: any) => isPrimitive(item.key) && typeof item.value === 'string');
  }
}
