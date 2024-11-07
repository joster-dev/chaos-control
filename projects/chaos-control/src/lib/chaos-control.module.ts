import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from '@joster-dev/icon';

import {
  ReadonlyComponent,
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  NumberComponent,
  TextComponent,
  SelectComponent,
} from './components';
import {
  BorderRadiusDirective,
  ControlDirective,
  ItemDirective,
  BusyDirective,
} from './directives';

@NgModule({
  declarations: [
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
    BusyDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    RouterModule,
  ],
  exports: [
    ReadonlyComponent,
    ChoiceComponent,
    ColorComponent,
    FileComponent,
    NumberComponent,
    TextComponent,
    SelectComponent,
    BusyDirective,
  ]
})
export class ChaosControlModule { }
