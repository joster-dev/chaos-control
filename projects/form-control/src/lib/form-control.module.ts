import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { IntegerComponent } from './integer/integer.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';
import { DateComponent } from './date/date.component';
import { ChoiceComponent } from './choice/choice.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { IconComponent } from './button/icon/icon.component';
import { NumberComponent } from './number/number.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DateComponent,
    IntegerComponent,
    SelectComponent,
    TextComponent,
    ChoiceComponent,
    MultiChoiceComponent,
    IconComponent,
    NumberComponent
  ],
  imports: [
    CommonModule,
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
    NumberComponent
  ]
})
export class FormControlModule { }
