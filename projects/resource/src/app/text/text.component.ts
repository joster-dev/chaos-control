import { Component } from '@angular/core';
import { Panel } from '../panel/panel';

@Component({
  selector: 'res-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';

  example1Panel: Panel;
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
    // this.example1Panel = new Panel(
    //   {
    //     key: this.example1,
    //     value: [this.testText, 'Lorem ipsum', 'L'],
    //     display: 'text'
    //   },
    //   [
    //     { key: this.isExample1Disabled, value: false, display: 'disabled' },
    //     { key: this.isExample1Required, value: true, display: 'required' },
    //     { key: this.example1Minlength, value: [0, 5], display: 'minlength' },
    //     { key: this.example1Maxlength, value: [100, 10], display: 'maxlength' }
    //   ]
    // );
    // this.example2Panel = new Panel(
    //   {
    //     key: this.example2,
    //     value: [this.testText, 'Lorem ipsum', 'L'],
    //     display: 'text'
    //   },
    //   [
    //     { key: this.isExample2Disabled, value: false, display: 'disabled' },
    //     { key: this.isExample2Required, value: true, display: 'required' },
    //     { key: this.example2Minlength, value: [0, 5], display: 'minlength' },
    //     { key: this.example2Maxlength, value: [100, 10], display: 'maxlength' }
    //   ]
    // );
  }
}

