import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BorderRadiusDirective } from '../../directives';

@Component({
  selector: 'jo-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../../atomic.scss',
    '../../styles.scss',
  ]
})
export class ButtonComponent extends BorderRadiusDirective {
  @Input()
  get isActive() {
    return this._isActive;
  }
  set isActive(value: boolean | '' | null | undefined) {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[isActive] expects: boolean | \'\'');
    this._isActive = value;
  }
  _isActive = false;

  @Input()
  get isDisabled() {
    return this._isDisabled;
  }
  set isDisabled(value: boolean | '' | null | undefined) {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[isDisabled] expects: boolean | \'\'');
    this._isDisabled = value;
  }
  _isDisabled = false;

  @Input()
  get isValid() {
    return this._isValid;
  }
  set isValid(value: boolean | '' | null | undefined) {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[isValid] expects: boolean | \'\'');
    this._isValid = value;
  }
  _isValid = true;

  @Input()
  set type(value: string) {
    if (value !== 'button' && value !== 'submit')
      throw new Error('[type] expects: \'button\' | \'submit\'');
    this._type = value;
  }
  _type = 'button';

  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() {
    super();
  }
}
