import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { ToggleComponent } from './toggle/toggle.component';
import { IntegerComponent } from './integer/integer.component';

@NgModule({
  declarations: [ButtonComponent, IntegerComponent, ToggleComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, IntegerComponent, ToggleComponent]
})
export class FormControlModule {}
