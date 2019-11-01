import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { ToggleComponent } from './toggle/toggle.component';
import { IntegerComponent } from './integer/integer.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DateComponent,
    IntegerComponent,
    ToggleComponent,
    SelectComponent,
    TextComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    DateComponent,
    IntegerComponent,
    ToggleComponent,
    SelectComponent,
    TextComponent
  ]
})
export class FormControlModule { }
