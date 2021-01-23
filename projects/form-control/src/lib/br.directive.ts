import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fcBr]'
})
export class BrDirective {
  @Input()
  get brRight() {
    return this._brRight;
  }
  set brRight(value: any) {
    if (value === '')
      value = true;
    if (value === null || value === undefined)
      value = false;
    if (typeof value === 'boolean')
      this._brRight = value;
  }
  _brRight = true;

  @Input()
  get brLeft() {
    return this._brLeft;
  }
  set brLeft(value: any) {
    if (value === '')
      value = true;
    if (value === null || value === undefined)
      value = false;
    if (typeof value === 'boolean')
      this._brLeft = value;
  }
  _brLeft = true;
}
