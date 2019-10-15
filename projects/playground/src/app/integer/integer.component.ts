import { Component } from '@angular/core';

@Component({
  selector: 'pg-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})
export class IntegerComponent {
  default: number | null = null;
  disabled: number | null = null;
  isFormRequired: boolean | null = null;
  isFormShowNull: boolean | null = null;

  negative: number | null = null;
  minError: number | null = null;
  maxError: number | null = null;
  isExampleFormDisabled: boolean | null = null;
  isExampleFormRequired: boolean | null = null;
  isExampleFormShowNull: boolean | null = null;

  disabledFieldset: number | null = null;
  isDisabledFieldsetFormRequired: boolean | null = null;
  isDisabledFieldsetFormShowNull: boolean | null = null;

  constructor() { }

  setFormModels(value: number) {
    this.default = value;
    this.disabled = value;
  }

  setExampleFormModels(value: number) {
    this.negative = value;
    this.minError = value;
    this.maxError = value;
  }

  setDisabledFieldsetFormModels(value: number) {
    this.disabledFieldset = value;
  }
}
