import { Component, Input } from '@angular/core';
import { IconType } from './icon-type.enum';

@Component({
  selector: 'fc-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() type = IconType.radio;
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isValid = true;

  constructor() { }

  get dynamicStroke() {
    if (this.isDisabled === true)
      return 'lightgrey';
    if (this.isValid === true)
      return 'black';
    return 'red';
  }
}
