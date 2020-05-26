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
}
