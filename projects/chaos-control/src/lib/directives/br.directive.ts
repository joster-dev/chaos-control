import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[joBr]'
})
export class BrDirective {
  @Input()
  get brRight() {
    return this._brRight;
  }
  set brRight(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    this._brRight = value;
  }
  _brRight = true;

  @Input()
  get brLeft() {
    return this._brLeft;
  }
  set brLeft(value: boolean | '') {
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    this._brLeft = value;
  }
  _brLeft = true;

  constructor() { }
}
