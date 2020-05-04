import { Component } from '@angular/core';

@Component({
  selector: 'pg-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscin';

  example1: string | null = null;
  isExample1Disabled = false;
  isExample1Required = false;

  example2: string | null = null;
  isExample2Required = false;

  constructor() { }
}
