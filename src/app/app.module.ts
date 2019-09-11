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
import { TitulFormComponent } from './features/forms/titul-form/titul-form.component';
import { DocFormComponent } from './features/forms/doc-form/doc-form.component';
import { UploadFileComponent } from './features/forms/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    TitulsComponent,
    DocsComponent,
    TitulFormComponent,
    DocFormComponent,
    UploadFileComponent
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
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
