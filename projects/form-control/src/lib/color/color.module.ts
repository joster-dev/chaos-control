import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorButtonComponent } from './button/button.component';
import { ColorComponent } from './color.component';
import { ColorIconComponent } from './icon/icon.component';

@NgModule({
  declarations: [
    ColorComponent,
    ColorIconComponent,
    ColorButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ColorComponent
  ]
})
export class ColorModule { }
