import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BusyDirective, ChoiceComponent } from 'chaos-control';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ContentComponent, BusyDirective, ChoiceComponent, FormsModule],
})
export class AppComponent {
  theme = 'dark';
  themes = ['dark', 'light', 'red', 'blue', 'yellow'].map((theme) => ({ key: theme, value: theme }));
  promise?: Promise<void>;
  forever = 999999999;

  onClickPromiseSpinner() {
    this.promise = new Promise((r) => window.setTimeout(() => r(), this.forever));
  }

  onChangeTheme(theme: string) {
    this.theme = theme;
    document.body.setAttribute('data-theme', theme);
  }
}
