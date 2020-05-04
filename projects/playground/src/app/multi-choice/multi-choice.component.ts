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

  example2: boolean[] | null = null;
  data2 = [
    { key: true, value: 'Right' },
    { key: false, value: 'Left' }
  ];
  isExample2Required = false;

  constructor() { }
}
