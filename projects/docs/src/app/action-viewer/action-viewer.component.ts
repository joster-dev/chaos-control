import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'doc-action-viewer[text][items][model]',
  templateUrl: './action-viewer.component.html',
  styleUrls: ['./action-viewer.component.scss']
})
export class ActionViewerComponent {
  @Input() text!: string;

  @Input() items: any[];

  @Input() model: any;
  @Output() modelChange = new EventEmitter();

  constructor() { }
}
