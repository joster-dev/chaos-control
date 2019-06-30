import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html'
})
export class ToggleComponent {
  @ViewChild('form') form!: NgForm;
  @ViewChild('disabledFieldsetForm') disabledFieldsetForm!: NgForm;

  default: boolean | null = null;
  disabled: boolean | null = null;
  required: boolean | null = null;
  disabledRequired: boolean | null = null;
  isShowNullForm = false;

  disabledFieldset: boolean | null = null;
  isRequiredDisabledFieldset = false;
  isShowNullDisabledFieldset = false;

  constructor() {}

  resetForm() {
    this.form.reset({
      isShowNullForm: false
    });
  }

  resetDisabledFieldsetForm() {
    this.disabledFieldsetForm.reset({
      isRequiredDisabledFieldset: false,
      isShowNullDisabledFieldset: false
    });
  }

  setFormValues(value: boolean) {
    this.default = value;
    this.disabled = value;
    this.required = value;
    this.disabledRequired = value;
  }
}
