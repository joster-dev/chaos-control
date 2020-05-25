import { Component } from '@angular/core';

@Component({
  selector: 'pg-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';

  example1: string | null = null;
  isExample1Disabled = false;
  isExample1Required = false;
  example1Minlength = 0;
  example1Maxlength = 100;

  example2: string | null = null;
  isExample2Required = false;
  example2Minlength = 0;
  example2Maxlength = 100;

  constructor() { }
}
