import { Component } from '@angular/core';
import { Panel } from '../panel/panel';

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

  example2Panel: Panel;
  example2: string | null = null;
  isExample2Disabled = false;
  isExample2Required = false;
  example2Minlength = 0;
  example2Maxlength = 100;

  constructor() {
    this.example2Panel = new Panel(
      this.example2,
      [
        this.testText,
        'Lorem ipsum',
        'L'
      ],
      [
        { key: this.isExample2Required, value: true, display: 'required' },
        { key: this.isExample2Disabled, value: false, display: 'disabled' },
        { key: this.example2Minlength, value: [0, 5], display: 'minlength' },
        { key: this.example2Maxlength, value: [100, 10], display: 'maxlength' }
      ]
    );
  }


}

