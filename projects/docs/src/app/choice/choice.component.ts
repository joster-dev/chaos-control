import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'doc-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {
  example1: boolean | number | null = null;
  example1Label = 'Lorum ipsum';
  isExample1Disabled = false;
  isExample1Required = false;
  isExample1BrLeft = true;
  isExample1BrRight = true;
  example1Items: KeyValue<boolean | number, string>[];

  example2: boolean | number | null = null;
  example2Label = 'Lorum ipsum';
  isExample2Disabled = false;
  isExample2Required = false;
  isExample2BrLeft = true;
  isExample2BrRight = true;
  example2Items: KeyValue<boolean | number, string>[];

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
  data2 = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' }
  ];

  constructor() {
    this.example1Items = this.data1;
    this.example2Items = this.data2;
  }
}
