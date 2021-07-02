import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[joBorderRadius]'
})
export class BorderRadiusDirective {

  @Input()
  get borderRadiusRight() {
    return this._borderRadiusRight;
  }
  set borderRadiusRight(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    this._borderRadiusRight = value;
  }
  _borderRadiusRight = true;

  @Input()
  get borderRadiusLeft() {
    return this._borderRadiusLeft;
  }
  set borderRadiusLeft(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    this._borderRadiusLeft = value;
  }
  _borderRadiusLeft = true;

  constructor() { }

}
