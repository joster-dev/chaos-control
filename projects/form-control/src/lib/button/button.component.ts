import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IconType } from '../icon/icon-type.enum';

@Component({
  selector: 'fc-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../atomic.scss',
    '../input.scss'
  ]
})
export class ButtonComponent {
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isValid = true;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() icon: IconType | null = null;

  @Output() blurred = new EventEmitter();
  @Output() clicked = new EventEmitter();

  constructor() { }
}
