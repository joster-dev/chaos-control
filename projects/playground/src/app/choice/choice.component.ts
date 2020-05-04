import { Component } from '@angular/core';

@Component({
  selector: 'pg-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  example1: boolean | number | null = null;
  data1 = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
    { key: 1, value: '1' },
    { key: 2, value: '2' },
    { key: 3, value: '3' },
    { key: 4, value: '4' },
    { key: 5, value: '5' },
    { key: 6, value: '6' },
    { key: 7, value: '7' }
  ];
  isExample1Disabled = false;
  isExample1Required = false;

  example2: boolean | null = null;
  data2 = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];
  isExample2Disabled = false;
  isExample2Required = false;

  constructor() { }
}
