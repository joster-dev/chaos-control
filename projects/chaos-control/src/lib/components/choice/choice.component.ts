import { booleanAttribute, Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '@joster-dev/icon';

import { ItemDirective } from '../../directives';
import { Item } from '../../models';

@Component({
    selector: 'jo-choice',
    templateUrl: './choice.component.html',
    styleUrls: [
        './choice.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IconComponent]
})
export class ChoiceComponent extends ItemDirective implements ControlValueAccessor {
  isColumn = input(false, { transform: booleanAttribute });

  id = `${Math.random().toString(36).substr(2, 9)}`;

  onClick(item: Item) {
    const keys = this.items().map(item => item.key);
    const model = this.model().filter(key => keys.includes(key));

    if (model.includes(item.key)) {
      if (this.required() === true && model.length === 1)
        return;

      this.setModel(model.filter(key => key !== item.key));
      return;
    }

    if (!this.isMultiple() && model.length === 1) {
      this.setModel([item.key]);
      return;
    }

    this.setModel([...model, item.key]);
  }
}
