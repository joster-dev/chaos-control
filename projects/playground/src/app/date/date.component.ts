import { Component } from '@angular/core';

@Component({
  selector: 'pg-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {

  default: string | null = null;

  constructor() { }

}
