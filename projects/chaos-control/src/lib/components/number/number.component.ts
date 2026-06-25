import { Component, computed, effect, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { IconComponent } from '@joster-dev/icon';
import { ControlDirective } from '../../directives';
import { isNumber } from '../../models';

function toNumber(label: string) {
  return (value: number | string): number => {
    const result = typeof value === 'string' ? parseFloat(value) : value;
    if (!isNumber(result))
      throw new Error(`[${label}] expects: number`);
    return result;
  };
}

@Component({
    selector: 'jo-number',
    templateUrl: './number.component.html',
    styleUrls: [
        './number.component.scss',
        '../../styles.scss',
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, IconComponent]
})
export class NumberComponent extends ControlDirective implements ControlValueAccessor {
  ngControl = inject(NgControl, { self: true });

  min = input(0, { transform: toNumber('min') });
  max = input(9, { transform: toNumber('max') });
  step = input(1, { transform: toNumber('step') });

  readonly sizePadding = 5;

  model = signal<number | null>(null);

  mustBeInteger = computed(() => Number.isInteger(this.step()));

  maxDigitSize = computed(() => Math.max(
    this.step().toString().length,
    this.max().toString().length,
    this.min().toString().length
  ));

  isDisabledAdd = computed(() =>
    this.isDisabled() === true
    || this.model() !== null
    && this.model()! + this.step() > this.max()
  );

  isDisabledSubtract = computed(() =>
    this.isDisabled() === true
    || this.model() !== null
    && this.model()! - this.step() < this.min()
  );

  constructor() {
    super();
    this.ngControl.valueAccessor = this;

    // Re-run validation synchronously whenever an input that feeds the
    // validators changes. No debounce means validity repaints under zoneless.
    effect(() => {
      this.min();
      this.max();
      this.required();
      this.validate();
    });
  }

  onBeforeinput(e: Event) {
    const event = e as InputEvent;
    if (event.data === null)
      return;
    const isDigit = /\d/.test(event.data);
    const isMinus = event.data === '-';
    const isMinusAllowed = this.min() < 0;
    const isBlockedNonDigit = !isDigit && !(isMinus && isMinusAllowed)
    const isPastMax = Number((this.model() || '') + event.data) > this.max();
    if (isBlockedNonDigit || isPastMax)
      event.preventDefault();
  }

  add(e: HTMLInputElement) {
    if (this.model() === null) {
      this.setModel(this.max());
      return;
    }

    e.stepUp();
    this.setModel(e.valueAsNumber);
  }

  subtract(e: HTMLInputElement) {
    if (this.model() === null) {
      this.setModel(this.min());
      return;
    }

    e.stepDown();
    this.setModel(e.valueAsNumber);
  }

  onModelChange(value: number | null) {
    this.setModel(value);
  }

  private setModel(value: number | null) {
    this.model.set(value);
    this.onChange(value);
  }

  onChange(_model: number | null) { }
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  writeValue(value: number | null) {
    if (value === undefined)
      value = null;

    if (typeof value === 'string')
      value = parseFloat(value);

    if (value === null || isNumber(value))
      this.model.set(value);
  }

  private validate() {
    const validators: ValidatorFn[] = [
      Validators.min(this.min()),
      Validators.max(this.max())
    ];

    if (this.required() === true)
      validators.push(Validators.required);

    this.ngControl.control?.setValidators(validators);
    this.ngControl.control?.updateValueAndValidity();
  }
}
