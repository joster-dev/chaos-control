import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

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
  @Output() continuousClick = new EventEmitter<void>();

  timer = timer(0, 100);
  clickSubscription?: Subscription;

  constructor() { }

  onClick(event: MouseEvent) {
    if (this.isDisabled)
      return;
    this.clicked.emit(event);
    this.continuousClick.emit();
  }

  onBlur(event: FocusEvent) {
    this.blurred.emit(event);
    this.stop();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.code !== 'Space')
      return;
    this.start();
  }

  onKeyup(event: KeyboardEvent) {
    if (event.code !== 'Space')
      return;
    this.stop();
  }

  start() {
    if (this.clickSubscription?.closed === false)
      return;
    this.clickSubscription = this.timer
      .subscribe(() => !this.isDisabled && this.continuousClick.emit());
  }

  stop() {
    if (this.clickSubscription === undefined)
      return;
    this.clickSubscription.unsubscribe();
  }
}
