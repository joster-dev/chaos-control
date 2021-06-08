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

  textModel = null;
  textIsActive = false;
  textIsDisabled = false;
  textIsValid = true;
  textType = 'button';

  readonlyModel = 'Text that cannot be edited';
  readonlyLabel = 'Hello!';

  numberModel = null;

  choiceModel = null;

  selectModel = null;

  colorModel = null;

  fileModel = null;
}
