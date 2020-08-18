import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'res-model-viewer[model]',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent {
  // [key: string]: any;

  @Input() display: string;

  @Input() model: any;
  @Output() modelChange = new EventEmitter();

  @Input() items: any[] = [];

  @Input() label: string;
  @Output() labelChange = new EventEmitter();

  @Input() labelItems = [
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.',
    'Lorem ipsum',
    'L',
    undefined
  ];

  @Input() required: boolean;
  @Output() requiredChange = new EventEmitter();

  @Input() disabled: boolean;
  @Output() disabledChange = new EventEmitter();

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

  boolItems = [true, false];
  isMoreCode = false;
  codeProps = [
    'label',
    'required',
    'disabled',
    'minlength',
    'maxlength',
    'min',
    'max',
    'step'
  ];
  testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula.';

  constructor() { }

  private get codeHtmlAttributes() {
    return this.codeProps
      .filter(prop => this[prop] !== undefined)
      .map(prop => {
        if (typeof this[prop] === 'string')
          return ` ${prop}="${this[prop]}"`;
        return ` [${prop}]="${this[prop]}"`;
      });
  }

  get codeHtml() {
    return `<fc-${this.display} ${this.codeHtmlAttributes.join(' ')}></fc-${this.display}>`;
  }
}
