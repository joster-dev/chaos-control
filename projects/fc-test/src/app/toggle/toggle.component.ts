import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html'
})
export class ToggleComponent {
  @ViewChild('form') form!: NgForm;

  default = null;
  showNull = null;
  disabled = null;
  disabledTrue = null;
  required = null;
  requiredDisabled = null;
  requiredShowNull = null;
  disabledFieldset = true;

  constructor() {}
}
