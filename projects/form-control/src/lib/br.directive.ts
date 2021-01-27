import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[fcBr]'
})
export class BrDirective {
  @Input()
  get brRight() {
    return this._brRight;
  }
  set brRight(v: boolean) {
    let value = v as unknown;
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[brRight] expects: boolean');
    this._brRight = value;
  }
  _brRight = true;

  @Input()
  get brLeft() {
    return this._brLeft;
  }
  set brLeft(v: boolean) {
    let value = v as unknown;
    if (value === '')
      value = true;
    if (value == null)
      value = false;
    if (typeof value !== 'boolean')
      throw new Error('[brLeft] expects: boolean');
    this._brLeft = value;
  }
  _brLeft = true;
}
