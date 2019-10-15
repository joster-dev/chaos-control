import { Component } from '@angular/core';

@Component({
  selector: 'pg-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  default: boolean | null = null;
  disabled: boolean | null = null;
  isFormShowNull = false;
  isFormRequired = false;

  disabledFieldset: boolean | null = null;
  isDisabledFieldsetFormShowNull = false;
  isDisabledFieldsetFormRequired = false;

  constructor() { }

  setFormModels(value: boolean) {
    this.default = value;
    this.disabled = value;
    this.disabledFieldset = value;
  }

  setDisabledFieldsetModels(value: boolean) {
    this.disabledFieldset = value;
  }
}
