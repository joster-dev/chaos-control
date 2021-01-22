import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'res-form-settings[form]',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.scss']
})
export class FormSettingsComponent {
  @Input() form!: NgForm;

  constructor() { }
}
