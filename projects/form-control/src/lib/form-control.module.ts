import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { SmallNumberComponent } from './small-number/small-number.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [ButtonComponent, SmallNumberComponent, ToggleComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, SmallNumberComponent, ToggleComponent]
})
export class FormControlModule {}
