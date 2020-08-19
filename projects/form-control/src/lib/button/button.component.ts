import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() blurred = new EventEmitter<FocusEvent>();
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor() { }

  onClick(event: MouseEvent) {
    if (this.isDisabled)
      return;
    this.clicked.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.blurred.emit(event);
  }
}
