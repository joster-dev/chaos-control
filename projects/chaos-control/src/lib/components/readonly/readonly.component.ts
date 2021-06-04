import { Component, Input } from '@angular/core';
import { primitive } from '../../models';

@Component({
  selector: 'jo-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.scss']
})
export class ReadonlyComponent {
  @Input() ngModel?: primitive;

  constructor() { }
}
