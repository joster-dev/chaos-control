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
  BorderRadiusDirective,
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
    ControlDirective,
    ItemDirective,
    SelectComponent,
    BorderRadiusDirective
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
