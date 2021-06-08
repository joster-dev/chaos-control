import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@joster-dev/icon';

import {
  ButtonComponent,
  ReadonlyComponent,
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  NumberComponent,
  TextComponent,
  SelectComponent
} from './components';
import {
  BrDirective,
  ControlDirective,
  ItemDirective,
} from './directives';

@NgModule({
  declarations: [
    ButtonComponent,
    ReadonlyComponent,
    ChoiceComponent,
    ColorComponent,
    FileComponent,
    NumberComponent,
    TextComponent,
    BrDirective,
    ControlDirective,
    ItemDirective,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule
  ],
  exports: [
    ButtonComponent,
    ReadonlyComponent,
    ChoiceComponent,
    ColorComponent,
    FileComponent,
    NumberComponent,
    TextComponent,
    SelectComponent,
  ]
})
export class ChaosControlModule { }
