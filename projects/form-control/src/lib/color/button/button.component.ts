import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'fc-color-button[title]',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../../input.scss'
  ]
})
export class ColorButtonComponent {
  @Input() isDisabled = false;
  @Input() title!: string;

  @Output() blurred = new EventEmitter<void>();
  @Output() continuousClick = new EventEmitter<void>();

  timer = timer(0, 120);
  clickSubscription?: Subscription;

  constructor() { }

  start() {
    this.clickSubscription = this.timer
      .subscribe(() => this.continuousClick.emit());
  }

  stop() {
    if (this.clickSubscription === undefined)
      return;

    this.clickSubscription.unsubscribe();
  }
}
