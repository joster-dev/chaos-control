import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @ViewChild('form') form!: NgForm;

  base = true;
  showNull = null;
  disabled = false;
  disabledShowNull = null;
  required = null;
  requiredShowNull = null;

  constructor() {}
}
