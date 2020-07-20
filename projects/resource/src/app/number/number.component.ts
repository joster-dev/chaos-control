import { Component } from '@angular/core';

@Component({
  selector: 'res-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  example1: number | null = null;
  example1Min = 0;
  example1Max = 9;
  isExample1Disabled = false;
  isExample1Required = false;

  constructor() { }
}
