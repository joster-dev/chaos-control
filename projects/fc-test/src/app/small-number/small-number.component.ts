import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-small-number',
  templateUrl: './small-number.component.html',
  styleUrls: ['./small-number.component.css']
})
export class SmallNumberComponent {
  @ViewChild('form') form!: NgForm;

  base = 0;
  negative = 0;
  float = 0;
  disabled = 5;
  invalid = 0;

  constructor() {}
}
