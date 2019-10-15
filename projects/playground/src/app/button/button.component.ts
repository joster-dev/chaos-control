import { Component } from '@angular/core';

@Component({
  selector: 'pg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  actions = 0;
  disabledActions = 0;
  disabledFieldsetActions = 0;
  isActive = false;
  isDisabled = false;

  constructor() { }

  reset() {
    this.actions = 0;
    this.disabledActions = 0;
    this.disabledFieldsetActions = 0;
    this.isActive = false;
    this.isDisabled = false;
  }
}
