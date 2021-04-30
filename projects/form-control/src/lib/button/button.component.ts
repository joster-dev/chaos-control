import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControlService } from '../form-control.service';
import { BrDirective } from '../br.directive';

@Component({
  selector: 'fc-button',
  templateUrl: './button.component.html',
  styleUrls: [
    './button.component.scss',
    '../atomic.scss',
    '../input.scss'
  ]
})
export class ButtonComponent extends BrDirective {
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() isValid = true;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() blurred = new EventEmitter<FocusEvent>();
  @Output() clicked = new EventEmitter<MouseEvent>();

  constructor(
    public formControlService: FormControlService,
    public hostElement: ElementRef,
  ) {
    super();
  }

  get hostElementColorStyleHexString(): string {
    return this.formControlService
      .colorStyleHexString(this.hostElement.nativeElement);
  }

  onClick(event: MouseEvent) {
    if (this.isDisabled)
      return;
    this.clicked.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.blurred.emit(event);
  }
}
