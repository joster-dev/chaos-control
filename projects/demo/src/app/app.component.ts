import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  theme = 'dark';
  themes = ['dark', 'light', 'red'];
  promise?: Promise<void>;
  forever = 999999999;

  onClickPromiseSpinner() {
    this.promise = new Promise((r) => window.setTimeout(() => r(), this.forever));
  }

  onClickTheme(theme: string) {
    this.theme = theme;
    document.body.setAttribute('data-theme', theme);
  }
}
