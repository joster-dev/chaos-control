import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', '../styles.scss']
})
export class ButtonComponent implements OnChanges {
  @Input() active = false;
  @Input() block = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() textAlign: 'left' | 'right' | 'center' = 'center';

  @Output() loseFocus = new EventEmitter();
  @Output() action = new EventEmitter();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.block) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', this.block === true ? 'flex' : 'inline-block');
    }
  }
}
