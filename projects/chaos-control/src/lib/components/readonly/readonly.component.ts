import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { primitive } from '../../models';

@Component({
    selector: 'jo-readonly',
    templateUrl: './readonly.component.html',
    styleUrls: [
        './readonly.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ReadonlyComponent {
  model = input<primitive>();
}
