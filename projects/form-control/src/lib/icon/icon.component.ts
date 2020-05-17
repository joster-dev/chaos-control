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
  @Input() fill: string | null = null;

  constructor() { }

  get dynamicStroke() {
    if (this.isDisabled === true)
      return 'lightgrey';
    if (this.isValid === true)
      return 'black';
    return 'red';
  }

  get squareFill() {
    if (this.fill === null || /^[0-9A-Fa-f]{6}$/.test(this.fill) === false)
      return '#FFF';

    return `#${this.fill}`;
  }

  get squareFillOpacity() {
    if (this.fill === null || /^[0-9A-Fa-f]{6}$/.test(this.fill) === false)
      return '0.0';

    return '1.0';
  }
}
