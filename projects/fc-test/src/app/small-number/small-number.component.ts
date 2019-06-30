import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-small-number',
  templateUrl: './small-number.component.html'
})
export class SmallNumberComponent {
  @ViewChild('form') form!: NgForm;
  @ViewChild('exampleForm') exampleForm!: NgForm;
  @ViewChild('disabledFieldsetForm') disabledFieldsetForm!: NgForm;

  default: number | null = null;
  disabled: number | null = null;
  required: number | null = null;
  disabledRequired: number | null = null;
  isShowNullForm: boolean | null = false;

  negative: number | null = null;
  minError: number | null = null;
  maxError: number | null = null;
  isDisabledExamples: boolean | null = false;
  isRequiredExamples: boolean | null = false;
  isShowNullExamples: boolean | null = false;

  disabledFieldset: number | null = null;
  isRequiredDisabledFieldset: boolean | null = false;
  isShowNullDisabledFieldset: boolean | null = false;

  constructor() {}

  resetForm() {
    this.form.reset({
      isShowNullAttributes: false
    });
  }

  resetDisabledFieldsetForm() {
    this.disabledFieldsetForm.reset({
      isRequiredDisabledFieldset: false,
      isShowNullDisabledFieldset: false
    });
  }

  resetExampleForm() {
    this.exampleForm.reset({
      isDisabledExamples: false,
      isRequiredExamples: false,
      isShowNullExamples: false
    });
  }

  setValuesForm(value: number) {
    this.default = value;
    this.disabled = value;
    this.required = value;
    this.disabledRequired = value;
  }

  setValuesExampleForm(value: number) {
    this.negative = value;
    this.minError = value;
    this.maxError = value;
  }
}
