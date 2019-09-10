import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsComponent } from './features/forms/docs/docs.component';
import {TitulsComponent} from "./features/forms/tituls/tituls.component";
import {
  MatFormFieldModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { TitulFormComponent } from './features/forms/titul-form/titul-form.component';
import { DocFormComponent } from './features/forms/doc-form/doc-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TitulsComponent,
    DocsComponent,
    TitulFormComponent,
    DocFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
