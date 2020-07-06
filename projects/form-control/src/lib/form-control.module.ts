
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@joster/icon';

import { ButtonComponent } from './button/button.component';
import { ChoiceComponent } from './choice/choice.component';
import { ColorComponent } from './color/color.component';
import { DateComponent } from './date/date.component';
import { IntegerComponent } from './integer/integer.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { NumberComponent } from './number/number.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DateComponent,
    IntegerComponent,
    SelectComponent,
    TextComponent,
    ChoiceComponent,
    MultiChoiceComponent,
    NumberComponent,
    ColorComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    ChoiceComponent,
    DateComponent,
    IntegerComponent,
    MultiChoiceComponent,
    SelectComponent,
    TextComponent,
    NumberComponent,
    ColorComponent
  ]
})
export class FormControlModule { }
