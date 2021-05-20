
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconModule } from '@joster-dev/icon';

import { ButtonComponent } from './button/button.component';
import { ChoiceComponent } from './choice/choice.component';
import { MultiChoiceComponent } from './choice/multi-choice.component';
import { ColorComponent } from './color/color.component';
import { DateComponent } from './date/date.component';
import { NumberComponent } from './number/number.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';
import { ControlDirective } from './control.directive';
import { ChoiceDirective } from './choice/choice.directive';
import { BrDirective } from './br.directive';
import { FileComponent } from './file/file.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DateComponent,
    SelectComponent,
    TextComponent,
    ChoiceComponent,
    MultiChoiceComponent,
    NumberComponent,
    ColorComponent,
    ControlDirective,
    ChoiceDirective,
    BrDirective,
    FileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule
  ],
  exports: [
    ButtonComponent,
    ChoiceComponent,
    DateComponent,
    MultiChoiceComponent,
    SelectComponent,
    TextComponent,
    NumberComponent,
    ColorComponent,
    FileComponent
  ]
})
export class FormControlModule { }
