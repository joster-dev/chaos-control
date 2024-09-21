import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChaosControlModule } from 'chaos-control';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChaosControlModule,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
