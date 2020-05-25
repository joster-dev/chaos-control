import { Component, Input } from '@angular/core';

@Component({
  selector: 'fc-color-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class ColorIconComponent {
  @Input() type: 'square' | 'plus' | 'minus' = 'square';
  @Input() fill: string | null = null;

  constructor() { }

  get fillOpacity() {
    if (this.fill === null || /^[0-9A-Fa-f]{6}$/.test(this.fill) === false)
      return '0.0';

    return '1.0';
  }
}
