import { NgModule } from '@angular/core';
import { FormControlComponent } from './form-control.component';
import { TextComponent } from './text/text.component';



@NgModule({
  declarations: [FormControlComponent, TextComponent],
  imports: [
  ],
  exports: [FormControlComponent]
})
export class FormControlModule { }
