import { Component, OnInit, Input, } from '@angular/core';

import { Panel } from './panel';

@Component({
  selector: 'res-panel[panel]',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() panel!: Panel;

  constructor() { }

  ngOnInit(): void { }

  get example1Html() {
    // const req = this.isExample1Required
    //   ? ' required'
    //   : '';
    // const dis = this.isExample1Disabled
    //   ? ' disabled'
    //   : '';
    // const min = this.example1Minlength === 0
    //   ? ''
    //   : ` [minlength]="${this.example1Minlength}"`;
    // const max = this.example1Maxlength === 100
    //   ? ''
    //   : ` [maxlength]="${this.example1Maxlength}"`;
    // return `<fc-text${req}${dis}${min}${max}></fc-text>`;
    return '';
  }
}
