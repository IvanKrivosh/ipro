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
  MatTableModule,
  MatTooltipModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTabsModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule
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
import { CheckPointShComponent } from './features/forms/check-point-sh/check-point-sh.component';
import { NewAktComponent } from './features/forms/new-akt/new-akt.component';
import { ViewDetalComponent } from './features/forms/view-detal/view-detal.component';
import { RutokentestComponent } from './rutokentest/rutokentest.component';
import { LimitFormComponent } from './features/forms/limit-form/limit-form.component';

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
    CheckPointShComponent,
    NewAktComponent,
    ViewDetalComponent,
    RutokentestComponent,
    LimitFormComponent
  ],
  entryComponents: [UploadFileComponent, DocFormComponent, NewAktComponent, ViewDetalComponent],
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
    MatTooltipModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
