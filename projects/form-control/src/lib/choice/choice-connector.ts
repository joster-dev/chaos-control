import { KeyValue } from '@angular/common';
import { Input } from '@angular/core';

import { ControlConnector } from '../control-connector';
import { primitive } from '../primitive';
import { isPrimitive } from '../primitive';

export class ChoiceConnector extends ControlConnector {
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
