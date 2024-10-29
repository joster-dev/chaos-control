import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  actions = 0;
  disabledActions = 0;
  items = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
  ];
  longItems = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
    { key: 1, value: 'One' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
  ];
  longTextItems = [
    { key: true, value: 'Yes Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' },
    { key: false, value: 'No' },
    { key: 1, value: 'One Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' },
    { key: 2, value: 'Two' },
    { key: 3, value: 'Three' },
  ]

  growingTextModel: string | null = null;
  textModel: string | null = null;

  readonlyModel = 'Text that cannot be edited';
  readonlyLabel = 'Readonly label';

  numberModel: number | null = null;

  choiceModel: boolean | number | null = null;

  multipleChoiceModel: (boolean | number)[] | null = null;

  longChoiceModel: (boolean | number)[] | null = null;

  selectModel: boolean | null = null;

  multipleSelectModel: boolean[] | null = null;

  longSelectModel: boolean[] | null = null;

  colorModel: string | null = null;

  fileModel: FileList | null = null;

  constructor() { }
}
