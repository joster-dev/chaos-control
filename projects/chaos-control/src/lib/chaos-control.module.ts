import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ChoiceComponent,
  ColorComponent,
  FileComponent,
  IconComponent,
  IconStackComponent,
  NumberComponent,
  ReadonlyComponent,
  SelectComponent,
  TextComponent,
} from './components';
import {
  BorderRadiusDirective,
  BusyDirective,
  ControlDirective,
  ItemDirective,
  SizeDirective,
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
    IconComponent,
    IconStackComponent,
    SizeDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    IconComponent,
    IconStackComponent,
  ]
})
export class ChaosControlModule { }
