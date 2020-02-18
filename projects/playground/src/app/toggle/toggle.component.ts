import { Component } from '@angular/core';

@Component({
  selector: 'pg-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  default: boolean | null = null;
  isFormDisabled = false;
  isFormShowNull = false;
  isFormRequired = false;

  disabledFieldset: boolean | null = null;
  isDisabledFieldsetFormShowNull = false;
  isDisabledFieldsetFormRequired = false;

  constructor() { }

  setFormModels(value: boolean) {
    this.default = value;
  }

  setDisabledFieldsetModels(value: boolean) {
    this.disabledFieldset = value;
  }
}
