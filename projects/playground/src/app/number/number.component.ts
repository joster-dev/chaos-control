import { Component } from '@angular/core';

@Component({
  selector: 'pg-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  example: number | null = null;
  exampleMin = 0;
  exampleMax = 9;
  isFormDisabled = false;
  isFormRequired = false;
  isFormShowNull = false;

  constructor() { }
}
