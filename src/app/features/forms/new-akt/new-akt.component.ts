import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-new-akt',
  templateUrl: './new-akt.component.html',
  styleUrls: ['./new-akt.component.scss']
})
export class NewAktComponent implements OnInit {

  NumContract: string;
  NumDoc: string;
  Object: string;
  Sum: number;
  Vat: number;
  idTypeCont: number;
  idTypeDoc: number;
  FileKS2: File;
  FileSmet: File;

  typeCost = [{name: 'Вид затрат №1', id : 1}, {name: 'Вид затрат №2', id : 2}, {name: 'Вид затрат №3', id : 3}];
  typeDoc = [{name: 'Тип №1', id : 1}, {name: 'Тип №2', id : 2}, {name: 'Тип №3', id : 3}];

  xlsxModel: any;
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
      this.parseXLSXtoJSON(this.FileKS2);
      this.parseXLSXtoHTML(this.FileKS2);
    } else {
      console.log(this.fileSmeta.nativeElement.files);
      this.FileSmet = this.fileSmeta.nativeElement.files[0];
      this.NameSMETA = this.FileSmet.name;
    }
  }

  parseXLSXtoHTML(file: File) {
    const data = {};
    let firstsheet = '';
    const reader = new FileReader();
    reader.onload = (file: any) => {
      const wb = XLSX.read(file.target.result,{ type: 'binary' });
      wb.SheetNames.forEach((name) => {
        data[name.trim()] = XLSX.utils.sheet_to_html(wb.Sheets[name]);
        if (!firstsheet) { firstsheet = name.trim(); }
      });
    };
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      this.xlsxModel = data[firstsheet];
      let index = this.xlsxModel.toString().indexOf('Сметная (договорная) стоимость в соответствии с договором подряда (субподряда)');
      this.xlsxModel = this.xlsxModel.toString().substring(index);
      index = this.xlsxModel.toString().indexOf('</tr>');
      this.xlsxModel = this.xlsxModel.toString().substring(index + 5);
      this.xlsxModel = '<html><body><table>' + this.xlsxModel;
      index = this.xlsxModel.toString().indexOf('ВСЕГО по акту');
      index = this.xlsxModel.toString().indexOf('</tr>', index);
      this.xlsxModel = this.xlsxModel.toString().substring(0, index + 5);
      this.xlsxModel += '</table></body></html>';
      console.log( this.xlsxModel);
    };
  }

  parseXLSXtoJSON(file: File) {
    const data = {};
    let firstsheet = '';
    const reader = new FileReader();
    reader.onload = (file: any) => {
      const wb = XLSX.read(file.target.result,{ type: 'binary' });
      wb.SheetNames.forEach((name) => {
        data[name.trim()] = XLSX.utils.sheet_to_json(wb.Sheets[name]);
        if (!firstsheet) { firstsheet = name.trim(); }
      });
    };
    reader.readAsBinaryString(file);
    reader.onloadend = () => {
      const json = data[firstsheet];
      const JsonSum =  json.find(item => item.__EMPTY === 'ВСЕГО по акту');
      this.Sum = Number(JsonSum.__EMPTY_28);
      const JsonVat =  json.find((item) => item.__EMPTY != null && String(item.__EMPTY).includes('НДС') );
      this.Vat = Number(JsonVat.__EMPTY_28);
      const JsonNum =  json.find(item => item.__rowNum__ === 20);
      this.NumDoc = String(JsonNum.__EMPTY_23);
    };
  }

}
