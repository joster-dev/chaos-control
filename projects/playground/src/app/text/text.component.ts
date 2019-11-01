import { Component } from '@angular/core';

@Component({
  selector: 'pg-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  default: string | null = null;
  disabled: string | null = null;

  isFormRequired = false;
  isFormShowNull = false;

  constructor() { }

  setFormModels(value: string) {
    this.default = value;
    this.disabled = value;
  }
}
