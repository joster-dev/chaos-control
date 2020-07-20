import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { FormControlModule } from '@joster/form-control';
import { FormControlModule } from 'dist/form-control';

import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { ButtonComponent } from './button/button.component';
import { ColorComponent } from './color/color.component';
import { TextComponent } from './text/text.component';
import { ChoiceComponent } from './choice/choice.component';
import { MultiChoiceComponent } from './multi-choice/multi-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    ButtonComponent,
    ColorComponent,
    TextComponent,
    ChoiceComponent,
    MultiChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
