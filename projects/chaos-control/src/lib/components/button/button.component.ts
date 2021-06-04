import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrDirective } from '../../directives';

@Component({
  selector: 'jo-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../../styles.scss',
  ]
})
export class ButtonComponent extends BrDirective {
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isValid = true;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() {
    super();
  }
}
