import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-small-number',
  templateUrl: './small-number.component.html'
})
export class SmallNumberComponent {
  @ViewChild('form') form!: NgForm;

  default = null;
  negative = 0;
  large = 0;
  showNull = null;
  disabled = 0;
  required = null;

  minError = null;
  maxError = null;

  disabledFieldset = 0;

  constructor() {}
}
