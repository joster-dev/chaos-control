import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallNumberComponent } from './small-number/small-number.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LibComponent } from './lib.component';

@NgModule({
  declarations: [LibComponent, SmallNumberComponent, ToggleComponent],
  imports: [CommonModule],
  exports: [SmallNumberComponent, ToggleComponent]
})
export class FormControlModule {}
