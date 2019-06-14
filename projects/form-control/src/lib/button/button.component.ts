import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() active = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() blur = new EventEmitter();
  @Output() action = new EventEmitter();

  constructor() {}
}
