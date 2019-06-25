import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-small-number',
  templateUrl: './small-number.component.html'
})
export class SmallNumberComponent {
  @ViewChild('form') form!: NgForm;

  default = null;
  negative = null;
  large = null;
  showNull = null;
  disabled = null;
  disabledTrue = null;
  required = null;
  requiredDisabled = -1;
  requiredShowNull = null;

  minError = 0;
  maxError = 0;

  disabledFieldset = 0;

  constructor() {}
}
