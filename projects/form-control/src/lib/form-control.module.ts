import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ToggleComponent } from './toggle/toggle.component';
import { IntegerComponent } from './integer/integer.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [ButtonComponent, IntegerComponent, ToggleComponent, SelectComponent, TextComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, IntegerComponent, ToggleComponent]
})
export class FormControlModule { }
