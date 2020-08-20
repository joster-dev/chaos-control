import { Component } from '@angular/core';

@Component({
  selector: 'res-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  example1: string | null = null;
  example1Label = 'Lorum ipsum';
  isExample1Disabled = false;
  isExample1Required = false;

  example2: string | null = null;
  example2Label = 'Lorum ipsum';
  isExample2Disabled = false;
  isExample2Required = false;

  constructor() { }
}
