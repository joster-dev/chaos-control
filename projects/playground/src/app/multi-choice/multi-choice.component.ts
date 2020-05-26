import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {
  example1: (boolean | number)[] | null = null;
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
  isExample1Disabled = false;
  isExample1Required = false;

  example2: boolean[] | null = null;
  data2 = [
    { key: true, value: 'Right' },
    { key: false, value: 'Left' }
  ];
  isExample2Required = false;

  constructor() { }
}
