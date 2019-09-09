import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsComponent } from './features/forms/docs/docs.component';
import {TitulsComponent} from "./features/forms/tituls/tituls.component";

@NgModule({
  declarations: [
    AppComponent,
    TitulsComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
