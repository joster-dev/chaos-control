import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FormControlModule, FormControlService } from 'dist/form-control';

import { AppComponent } from './app.component';
import { IntegerComponent } from './integer/integer.component';
import { ToggleComponent } from './toggle/toggle.component';
import { ButtonComponent } from './button/button.component';
import { DateComponent } from './date/date.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    IntegerComponent,
    ToggleComponent,
    ButtonComponent,
    DateComponent,
    SelectComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    FormControlModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
