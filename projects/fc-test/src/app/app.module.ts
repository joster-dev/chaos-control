import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FormControlModule } from 'dist/form-control';

import { AppComponent } from './app.component';
import { ToggleComponent } from './toggle/toggle.component';
import { SmallNumberComponent } from './small-number/small-number.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ToggleComponent,
    SmallNumberComponent,
    ButtonComponent
  ],
  imports: [BrowserModule, FormControlModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
