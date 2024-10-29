import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { ItemDirective } from '../../directives';
import { Item } from '../../models';

@Component({
  selector: 'jo-choice',
  templateUrl: './choice.component.html',
  styleUrls: [
    './choice.component.scss',
    '../../styles.scss',
  ]
})
export class ChoiceComponent extends ItemDirective implements ControlValueAccessor {
  constructor(
    @Self() public override ngControl: NgControl,
  ) {
    super(ngControl);
  }

  @Input()
  get isColumn() {
    return this._isColumn;
  }
  set isColumn(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('isColumn expects: boolean')
    this._isColumn = value;
  }
  _isColumn = false;

  id = `${Math.random().toString(36).substr(2, 9)}`;

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
