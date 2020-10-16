import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'res-model-viewer[model]',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent {
  @Input() display: string;

  @Input() model: any;
  @Output() modelChange = new EventEmitter();

  @Input() modelItems: any[] = [];

  @Input() label: string;
  @Output() labelChange = new EventEmitter();

  @Input() labelItems = [
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.',
    'Lorem ipsum',
    ''
  ];

  @Input() required: boolean;
  @Output() requiredChange = new EventEmitter();

  @Input() disabled: boolean;
  @Output() disabledChange = new EventEmitter();

  @Input() brLeft: boolean;
  @Output() brLeftChange = new EventEmitter();

  @Input() brRight: boolean;
  @Output() brRightChange = new EventEmitter();

  @Input() minlength: number;
  @Output() minlengthChange = new EventEmitter();

  @Input() minlengthItems: number[] = [];

  @Input() maxlength: number;
  @Output() maxlengthChange = new EventEmitter();

  @Input() maxlengthItems: number[] = [];

  @Input() min: number;
  @Output() minChange = new EventEmitter();

  @Input() minItems: number[] = [];

  @Input() max: number;
  @Output() maxChange = new EventEmitter();

  @Input() maxItems: number[] = [];

  @Input() step: number;
  @Output() stepChange = new EventEmitter();

  @Input() stepItems: number[] = [];

  @Input() choice: any;
  @Output() choiceChange = new EventEmitter();

  @Input() choiceItems: any[] = [];

  @Input() limit: number;
  @Output() limitChange = new EventEmitter();

  @Input() limitItems: number[] = [];

  boolItems = [true, false];
  isMoreCode = false;
  codeProps = [
    'required',
    'disabled',
    'minlength',
    'maxlength',
    'min',
    'max',
    'step',
    'items'
  ];
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';

  constructor() { }

  get codeHtmlAttributes() {
    return this.codeProps
      .filter(prop => this[prop] !== undefined)
      .map(prop => {
        if (typeof this[prop] === 'string')
          return ` ${prop}="${this[prop]}"`;
        return ` [${prop}]="${this[prop]}"`;
      })
      .concat(this.choiceItems.length === 0 ? [] : ` [items]="data${this.choiceItems.indexOf(this.choice) + 1}"`);
  }

  get codeHtmlStart() {
    return `<fc-${this.display}`;
  }
  get codeHtmlEnd() {
    return `>${this.label}</fc-${this.display}>`;
  }
  get codeHtml() {
    return `<fc-${this.display} ${this.codeHtmlAttributes.join(' ')}></fc-${this.display}>`;
  }
}
