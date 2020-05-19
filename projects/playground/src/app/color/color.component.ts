import { Component } from '@angular/core';

@Component({
  selector: 'pg-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  example1: string | null = null;
  example1Min = '000000';
  example1Max = 'ffffff';
  isExample1Disabled = false;
  isExample1Required = false;

  example2: string | null = null;
  isExample2Required = false;

  constructor() { }
}