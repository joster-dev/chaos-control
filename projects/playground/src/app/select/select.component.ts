import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pg-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  default: string | null = null;
  defaultData = [
    { key: 'jim', value: 'jimbo slice the third' },
    { key: 'a', value: 'equally long string' }
  ];
  isFormRequired = false;
  isFormShowNull = false;

  constructor() { }

  ngOnInit() {
  }

}
