import { Component } from '@angular/core';

@Component({
  selector: 'pg-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})
export class IntegerComponent {
  default: number | null = null;
  defaultMin = 0;
  defaultMax = 9;
  isFormDisabled = false;
  isFormRequired = false;
  isFormShowNull = false;

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

  setExampleFormModels(value: number) {
    this.negative = value;
    this.minError = value;
    this.maxError = value;
  }

  setDisabledFieldsetFormModels(value: number) {
    this.disabledFieldset = value;
  }
}
