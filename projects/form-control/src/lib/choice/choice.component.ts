import { Component, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Item } from '../primitive';
import { debounceTime } from 'rxjs/operators';

import { isPrimitive, primitive } from '../primitive';
import { ChoiceDirective } from './choice.directive';

// make choice -> select
// when no wrap items its row items no stretch
// when wrap occur regular select w/ dropdown

@Component({
  selector: 'fc-choice',
  templateUrl: './choice.component.html',
  styleUrls: [
    '../atomic.scss',
    '../control.scss',
    './choice.component.scss'
  ]
})
export class ChoiceComponent extends ChoiceDirective implements ControlValueAccessor {
  set model(value: primitive | null) {
    this._model = value;
    this.onChange(value);
  }
  _model: primitive | null = null;

  constructor(@Self() public ngControl: NgControl) {
    super();
    this.validation
      .pipe(debounceTime(100))
      .subscribe(() => this.validate());
    ngControl.valueAccessor = this;
  }

  onClick(item: Item) {
    if (this._model === item.key) {
      if (this.required === true)
        return;

      this.model = null;
      return;
    }
    this.model = item.key;
  }

  onChange(_value: primitive | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(v: primitive | null) {
    let value = v as unknown;
    if (value === undefined)
      value = null;
    if (value !== null && !isPrimitive(value))
      throw new Error('control value must be primitive');
    this._model = value;
  }

  private invalidValidator(items: Item[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      control.value !== null && !items.map(item => item.key).includes(control.value)
        ? { invalid: control.value }
        : null;
  }

  private validate() {
    const validators: ValidatorFn[] = [
      this.invalidValidator(this.items)
    ];
    if (this.required === true)
      validators.push(Validators.required);
    if (this.ngControl.control === null)
      throw new Error('expected control to be defined');
    this.ngControl.control.setValidators(validators);
    this.ngControl.control.updateValueAndValidity();
  }
}
