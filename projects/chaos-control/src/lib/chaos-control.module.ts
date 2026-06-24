import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent, IconStackComponent } from '@joster-dev/icon';

import {
  ChoiceComponent,
  ColorComponent,
  FileComponent,
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
    SizeDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IconComponent,
    IconStackComponent,
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
