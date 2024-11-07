import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  promise?: Promise<void>;
  ten = 10000;
  forever = 999999999;

  onClickPromiseSpinner() {
    this.promise = new Promise((r) => window.setTimeout(() => r(), this.forever));
  }
}
