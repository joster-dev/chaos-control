import { Component } from '@angular/core';

@Component({
  selector: 'res-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  example1: boolean | number | null = null;
  data1 = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
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

  example2: boolean | null = null;
  data2 = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];
  isExample2Required = false;

  constructor() { }
}
