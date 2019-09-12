import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-new-akt',
  templateUrl: './new-akt.component.html',
  styleUrls: ['./new-akt.component.scss']
})
export class NewAktComponent implements OnInit {

  NumContract: string;
  Object: string;
  idTypeCont: number;
  idTypeDoc: number;
  typeCost = [{name: 'Вид затрат №1', id : 1}, {name: 'Вид затрат №2', id : 2}, {name: 'Вид затрат №3', id : 3}];
  typeDoc = [{name: 'Тип №1', id : 1}, {name: 'Тип №2', id : 2}, {name: 'Тип №3', id : 3}];
  FileKS2: File;
  FileSmet: File;
  NameKS2 = 'Файл КС2';
  NameSMETA = 'Файл сметы';
  @ViewChild('fileKS2', {static: true}) fileKS2;
  @ViewChild('fileSmeta', {static: true}) fileSmeta;
  constructor(
    public dialogRef: MatDialogRef<NewAktComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idContract: number
    }) {}

    files: File[];
  ngOnInit() {
  }

  closeForm() {
    this.dialogRef.close();
  }
  saveDocument() {
    this.dialogRef.close(this.files);
  }

  AddFile(type: number) {
    if (type === 1) {
      this.FileKS2 = this.fileKS2.nativeElement.files[0];
      this.NameKS2 = this.FileKS2.name;
      this.files = this.fileKS2.nativeElement.files;
    } else {
      console.log(this.fileSmeta.nativeElement.files);
      this.FileSmet = this.fileSmeta.nativeElement.files[0];
      this.NameSMETA = this.FileSmet.name;
    }
  }

}
