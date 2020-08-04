import { Component } from '@angular/core';

@Component({
  selector: 'res-text',
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

  get example1Html() {
    const req = this.isExample1Required
      ? ' required'
      : '';
    const dis = this.isExample1Disabled
      ? ' disabled'
      : '';
    const min = this.example1Minlength === 0
      ? ''
      : ` [minlength]="${this.example1Minlength}"`;
    const max = this.example1Maxlength === 100
      ? ''
      : ` [maxlength]="${this.example1Maxlength}"`;
    return `<fc-text${req}${dis}${min}${max}></fc-text>`;
  }
}

