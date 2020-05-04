import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FormControlModule } from 'dist/form-control';

import { AppComponent } from './app.component';
import { IntegerComponent } from './integer/integer.component';
import { ButtonComponent } from './button/button.component';
import { DateComponent } from './date/date.component';
import { SelectComponent } from './select/select.component';
import { TextComponent } from './text/text.component';
import { ChoiceComponent } from './choice/choice.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';
import { NumberComponent } from './number/number.component';

@NgModule({
  declarations: [
    AppComponent,
    IntegerComponent,
    ButtonComponent,
    DateComponent,
    SelectComponent,
    TextComponent,
    ChoiceComponent,
    MultiChoiceComponent,
    NumberComponent
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
