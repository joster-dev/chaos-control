import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-small-number',
  templateUrl: './small-number.component.html'
})
export class SmallNumberComponent {
  @ViewChild('form') form!: NgForm;

  base = 0;
  negative = 0;
  large = 0;
  float = 0;
  disabled = 0;
  disabledFieldset = 0;
  minError = 0;
  maxError = 0;

  constructor() {}
}
