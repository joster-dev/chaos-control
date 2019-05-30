import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormControlModule } from 'form-control';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormControlModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
