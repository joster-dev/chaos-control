import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {
  multiChoice = null;
  data = [
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

  constructor() { }
}
