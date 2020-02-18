import { Component } from '@angular/core';

@Component({
  selector: 'pg-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscin';

  default: string | null = null;
  disabled: string | null = null;
  required: string | null = null;
  isFormDisabled = false;
  isFormRequired = false;

  disabledFieldset: string | null = null;
  isDisabledFieldsetFormRequired = false;

  constructor() { }

  setFormModels(value: string) {
    this.default = value;
    this.disabled = value;
    this.required = value;
  }

  setDisabledFieldsetFormModels(value: string) {
    this.disabledFieldset = value;
  }
}
