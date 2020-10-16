import { Component } from '@angular/core';

@Component({
  selector: 'res-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';

  example1: string | null = null;
  example1Label = 'Lorum ipsum';
  isExample1Disabled = false;
  isExample1Required = false;
  isExample1BrLeft = true;
  isExample1BrRight = true;
  example1Minlength = 0;
  example1Maxlength = 0;

  example2: string | null = null;
  example2Label = 'Lorum ipsum';
  isExample2Disabled = false;
  isExample2Required = false;
  isExample2BrLeft = true;
  isExample2BrRight = true;
  example2Minlength = 0;
  example2Maxlength = 0;

  constructor() { }
}

