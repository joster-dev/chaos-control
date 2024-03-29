import { Component, Input } from '@angular/core';
import { BorderRadiusDirective } from '../../directives';

@Component({
  selector: 'jo-link',
  templateUrl: './link.component.html',
  styleUrls: [
    './link.component.scss',
    '../../atomic.scss',
    '../../styles.scss',
  ]
})
export class LinkComponent extends BorderRadiusDirective {
  @Input() link: string | (string | number | boolean)[] = '';
  @Input() href = '';
  @Input() hreflang = '';
  @Input() target: '_self' | '_blank' | '_parent' | '_top' = '_self';

  constructor() {
    super();
  }
}
