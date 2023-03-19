import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from '@joster-dev/icon';

import {
  ButtonComponent,
  ReadonlyComponent,
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  NumberComponent,
  TextComponent,
  SelectComponent,
  LinkComponent
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
    BorderRadiusDirective,
    LinkComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    RouterModule,
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
    LinkComponent,
  ]
})
export class ChaosControlModule { }
