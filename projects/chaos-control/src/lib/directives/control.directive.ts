import { booleanAttribute, Directive, input, signal } from '@angular/core';
import { BorderRadiusDirective } from './border-radius.directive';

@Directive({
    selector: '[joControl]'
})
export class ControlDirective extends BorderRadiusDirective {
  required = input(false, { transform: booleanAttribute });

  isDisabled = signal(false);

  onTouched() { }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
