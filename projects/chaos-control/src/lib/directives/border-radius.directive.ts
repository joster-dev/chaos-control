import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
    selector: '[ccBorderRadius]'
})
export class BorderRadiusDirective {
  borderRadiusRight = input(true, { transform: booleanAttribute });
  borderRadiusLeft = input(true, { transform: booleanAttribute });
}
