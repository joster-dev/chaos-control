import { Component } from '@angular/core';

import { Panel } from '../panel/panel';

@Component({
  selector: 'res-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent {
  billion = 1000000000;

  example1Panel: Panel;
  example1: number | null = null;
  example1Min = 0;
  example1Max = 9;
  isExample1Disabled = false;
  isExample1Required = false;

  constructor() {
    // this.example1Panel = new Panel(
    //   {
    //     key: this.example1,
    //     value: [this.billion, 100, 1],
    //     display: 'text'
    //   },
    //   [
    //     { key: this.isExample1Disabled, value: false, display: 'disabled' },
    //     { key: this.isExample1Required, value: true, display: 'required' },
    //     { key: this.example1Min, value: [0, 5], display: 'min' },
    //     { key: this.example1Max, value: [9, 6], display: 'max' }
    //   ]
    // );
  }
}
