import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import { MarkdownModule } from 'ngx-markdown';

// import { FormControlModule } from '@joster-dev/chaos-control';
import { ChaosControlModule } from 'dist/chaos-control';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChaosControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
