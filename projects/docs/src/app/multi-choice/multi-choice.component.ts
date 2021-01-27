import { Component } from '@angular/core';
import { Item } from 'dist/form-control/public-api';

@Component({
  selector: 'doc-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {
  example1: boolean[] | number[] | null = null;
  example1Label = 'Lorum ipsum';
  example1Limit = 0;
  isExample1Disabled = false;
  isExample1Required = false;
  isExample1BrLeft = true;
  isExample1BrRight = true;
  example1Items: Item[];

  example2: boolean[] | number[] | null = null;
  example2Label = 'Lorum ipsum';
  example2Limit = 0;
  isExample2Disabled = false;
  isExample2Required = false;
  isExample2BrLeft = true;
  isExample2BrRight = true;
  example2Items: Item[];

  data1 = [
    { key: true, value: 'Right' },
    { key: false, value: 'Left' },
    { key: 1, value: 'One' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
    { key: 4, value: 'Four' },
    { key: 5, value: 'Five' },
    { key: 6, value: 'Six' },
    { key: 7, value: 'Seven' }
  ];
  data2 = [
    { key: true, value: 'Right' },
    { key: false, value: 'Left' }
  ];

  constructor() {
    this.example1Items = this.data1;
    this.example2Items = this.data2;
  }
}
