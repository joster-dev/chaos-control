import { Component } from '@angular/core';

@Component({
  selector: 'pg-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  isFormRequired = false;
  isFormShowNull = false;
  // default matches library
  isFormShowArrow = true;

  default: string | null = null;
  defaultData = [
    { key: 1, value: 'Lorem ipsum dolor sit amet, consectetuer adipiscin' },
    { key: 2, value: 'Sed ut perspiciatis unde omnis iste natus error si' },
    { key: 3, value: 'Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musi' },
    { key: 4, value: 'Far far away, behind the word mountains, far from.' },
    { key: 5, value: 'A wonderful serenity has taken possession of my en' },
    { key: 6, value: 'One morning, when Gregor Samsa woke from troubled.' },
    { key: 7, value: 'The quick, brown fox jumps over a lazy dog. DJs fl' }
  ];

  empty: string | null = null;
  emptyData = [];

  constructor() { }
}
