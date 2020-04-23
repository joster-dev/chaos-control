import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() type: 'radio' | 'check' | 'times' = 'radio';
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isValid = true;

  constructor() { }

  get radioStroke() {
    if (this.isDisabled)
      return 'lightgrey';
    if (this.isValid)
      return 'black';
    return 'red';
  }

  get checkStroke() {
    if (this.isDisabled)
      return 'lightgrey';
    if (this.isValid)
      return 'black';
    return 'red';
  }
}
