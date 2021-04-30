import { Directive, HostListener, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'input[fcMask]'
})
export class MaskDirective implements ControlValueAccessor {

  @Input() fcMask: 'color' | 'date' = 'color';

  constructor() { }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    debugger;
  }

  @HostListener('compositionstart')
  onCompositionStart(event: any) {
    debugger;
  }

  @HostListener('compositionend')
  onCompositionEnd(event: any) {
    debugger;
  }

  writeValue(value: unknown): void {
    throw new Error('Method not implemented.');
  }
}

// onKeydown(event: KeyboardEvent) {
//   const ele = event.target as HTMLInputElement;
//   if (event.key === 'Home') {
//     event.preventDefault();
//     this.selectionStart = 1;
//     this.setSelection(ele);
//     return;
//   }
//   if (event.key === 'ArrowUp') {
//     if (ele.selectionStart !== null) {
//       if ([1, 2].includes(ele.selectionStart))
//         this.add(0);
//       if ([3, 4].includes(ele.selectionStart))
//         this.add(1);
//       if ([5, 6, 7].includes(ele.selectionStart))
//         this.add(2);
//       this.selectionStart = ele.selectionStart;
//       this.setSelection(ele);
//     }
//     event.preventDefault();
//   }
//   if (event.key === 'ArrowDown') {
//     if (ele.selectionStart !== null) {
//       if ([1, 2].includes(ele.selectionStart))
//         this.subtract(0);
//       if ([3, 4].includes(ele.selectionStart))
//         this.subtract(1);
//       if ([5, 6, 7].includes(ele.selectionStart))
//         this.subtract(2);
//       this.selectionStart = ele.selectionStart;
//       this.setSelection(ele);
//     }
//     event.preventDefault();
//   }
//   if (event.key === 'ArrowLeft' && ele.selectionStart === 1)
//     event.preventDefault();
// }


// onBeforeinput(e: Event) {
//   const event = e as InputEvent;
//   console.log(event.inputType, event.data);
//   event.preventDefault();
//   const ele = event.target as HTMLInputElement;
//   if (ele.selectionStart === null || ele.selectionEnd === null)
//     return;
//   this.selectionStart = ele.selectionStart;
//   if (event.data === null) {
//     if (event.inputType === 'deleteContentForward') {
//       if (this.selectionStart === 7)
//         return;
//       if (this.selectionStart === ele.selectionEnd) {
//         if (this.selectionStart === 0) {
//           this.selectionStart = 1;
//           this.setSelection(ele);
//           return;
//         }
//         this.insertText('_');
//         this.selectionStart = this.selectionStart + 1;
//         this.setSelection(ele);
//         return;
//       }
//       if (this.selectionStart === 0)
//         this.selectionStart = 1;
//       this.insertText('_'.repeat(ele.selectionEnd - this.selectionStart));
//       this.setSelection(ele);
//     }
//     else if (event.inputType === 'deleteContentBackward') {
//       if (this.selectionStart === ele.selectionEnd) {
//         if (this.selectionStart <= 1) {
//           this.selectionStart = 1;
//           this.setSelection(ele);
//           return;
//         }
//         this.selectionStart = this.selectionStart - 1;
//         this.insertText('_');
//         this.setSelection(ele);
//         return;
//       }
//       if (this.selectionStart === 0)
//         this.selectionStart = 1;
//       this.insertText('_'.repeat(ele.selectionEnd - this.selectionStart));
//       this.setSelection(ele);
//     }
//     return;
//   }

//   if (/^#[0-9A-Fa-f]{6}$/.test(event.data)) {
//     this.model = event.data;
//     return;
//   }

//   if (!/^[0-9A-Fa-f]{1,6}$/.test(event.data))
//     return;

//   if (this.selectionStart === 0)
//     this.selectionStart = 1;

//   if (7 - this.selectionStart >= event.data.length) {
//     this.model = this.model.substring(0, this.selectionStart)
//       + event.data.toUpperCase()
//       + this.model.substring(this.selectionStart + event.data.length, this.model.length);
//     this.selectionStart = this.selectionStart + event.data.length;
//     this.setSelection(ele);
//   }
// }
