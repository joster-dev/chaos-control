import { Component } from '@angular/core';
import { Panel } from '../panel/panel';

@Component({
  selector: 'res-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  example1Panel: Panel;
  example1: string | null = null;
  example1Label = 'Lorum ipsum';
  isExample1Disabled = false;
  isExample1Required = false;
  example1Minlength = 0;
  example1Maxlength = 100;

  example2Panel: Panel;
  example2: string | null = null;
  example2Label = 'Lorum ipsum';
  isExample2Disabled = false;
  isExample2Required = false;
  example2Minlength = 0;
  example2Maxlength = 100;

  constructor() { }
}

