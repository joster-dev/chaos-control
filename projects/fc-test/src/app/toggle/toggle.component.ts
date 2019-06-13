import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html'
})
export class ToggleComponent {
  @ViewChild('form') form!: NgForm;

  base = true;
  showNull = null;
  disabled = null;
  disabledShowNull = null;
  required = null;
  requiredDisabled = null;
  requiredShowNull = null;

  constructor() {}
}
