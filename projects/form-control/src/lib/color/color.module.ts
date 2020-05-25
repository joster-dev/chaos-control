import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorComponent } from './color.component';
import { ColorIconComponent } from './icon/icon.component';
import { ColorButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';

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
