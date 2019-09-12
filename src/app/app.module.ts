import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsComponent } from './features/forms/docs/docs.component';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatPaginatorModule, MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import { TitulFormComponent } from './features/forms/titul-form/titul-form.component';
import { DocFormComponent } from './features/forms/doc-form/doc-form.component';
import { UploadFileComponent } from './features/forms/upload-file/upload-file.component';
import {TitulsComponent} from './features/forms/tituls/tituls.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DogovorsComponent } from './features/forms/dogovors/dogovors.component';
import { CheckPointComponent } from './features/forms/check-point/check-point.component';
import { NewAktComponent } from './features/forms/new-akt/new-akt.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    TitulsComponent,
    DocsComponent,
    TitulFormComponent,
    DocFormComponent,
    UploadFileComponent,
    DogovorsComponent,
    CheckPointComponent,
    NewAktComponent
  ],
  entryComponents: [UploadFileComponent, DocFormComponent, NewAktComponent],
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
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
