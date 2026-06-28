import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ChoiceComponent,
  ColorComponent,
  DateComponent,
  DatetimeComponent,
  FileComponent,
  NumberComponent,
  ReadonlyComponent,
  SelectComponent,
  TextComponent,
  TimeComponent,
} from 'chaos-control';
import { DataService } from '../data.service';

@Component({
    selector: 'demo-content',
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
      FormsModule,
      ReadonlyComponent,
      TextComponent,
      ChoiceComponent,
      SelectComponent,
      ColorComponent,
      NumberComponent,
      FileComponent,
      TimeComponent,
      DateComponent,
      DatetimeComponent,
    ],
})
export class ContentComponent {
  ds = inject(DataService);
}
