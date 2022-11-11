import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  actions = 0;
  disabledActions = 0;
  items = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
  ];

  textModel: string | null = null;

  readonlyModel = 'Text that cannot be edited';
  readonlyLabel = 'Readonly label';

  numberModel: number | null = null;

  choiceModel: boolean | null = null;

  multipleChoiceModel: boolean[] | null = null;

  selectModel: boolean | null = null;

  multipleSelectModel: boolean[] | null = null;

  colorModel: string | null = null;

  fileModel: FileList | null = null;
}
