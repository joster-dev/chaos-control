import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fc-lib',
  template: '<!-- html content -->',
  styleUrls: ['./styles.scss'],
  // workaround for library not supporting styles attribute in angular.json
  encapsulation: ViewEncapsulation.None
})
export class LibComponent {
  constructor() {}
}
