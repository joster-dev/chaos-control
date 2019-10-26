import { Component } from '@angular/core';

@Component({
  selector: 'fc-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  isDisabled = false;
  error?: 'required' | 'min' | 'max';
  _model: number | null = null;
  onChange = (_model: number | null) => { };
  onTouched = () => { };

  constructor() { }

  get model() {
    return this._model;
  }

  set model(value: number | null) {
    this._model = value;
    this.onChange(this._model);
  }

}
