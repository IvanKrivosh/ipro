import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as XLSX from 'xlsx';
import {ComplActModel} from '../../../models/compl-act-model';
import {ContractService} from '../../../services/contract-service';
import {DictionaryService} from '../../../services/dictionary-service';
import {CostTypeInfo} from '../../../models/cost-type-model';
import {DocumentTypeInfo} from '../../../models/document-type-model';
import {ObjectModel} from '../../../models/object-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-new-akt',
  templateUrl: './new-akt.component.html',
  styleUrls: ['./new-akt.component.scss'],
  providers: [ContractService, DictionaryService]
})
export class NewAktComponent implements OnInit, AfterViewInit {

  comlAkt: ComplActModel;
  FileKS2: File;
  FileSmet: File;

  objects: ObjectModel[];
  typeCost: CostTypeInfo[];
  typeDoc: DocumentTypeInfo[];
  userForm: FormGroup;

  xlsxModel: any;
  NameKS2 = null;
  NameSMETA = null;
  @ViewChild('fileKS2', {static: true}) fileKS2;
  @ViewChild('fileSmeta', {static: true}) fileSmeta;
  constructor(
    private fb: FormBuilder,
    private contractservoce: ContractService,
    private dictionaryservice: DictionaryService,
    public dialogRef: MatDialogRef<NewAktComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      numContract: string,
      idContract: number
    }) {}

    files: File[];
  ngOnInit() {
    this.initForm();
    this.comlAkt = {
      contractId: this.data.idContract,
      documentNumber: null,
      documentTypeId: 19,
      documentTypeName: '',
      costTypeId: null,
      costTypeName: '',
      objectId: 1,
      documentDate: null,
      sum: 0,
      vat: 0,
      estimateText: '',
      estimateFileId: null,
      ks2Text: '',
      ks2FileId: null
  };
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: [null, [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)]
    ]
    });
  }

  ngAfterViewInit(): void {
    this.dictionaryservice.getCostTypes().subscribe( data => {
      this.typeCost = data;
    });

    this.dictionaryservice.getDocumentTypes().subscribe( data => {
      this.typeDoc = data;
    });

    this.dictionaryservice.getObjects().subscribe( data => {
      this.objects = data;
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
  saveDocument() {
    this.contractservoce.postAkt(this.comlAkt).subscribe(res => {
      this.dialogRef.close(res);
    }, error => {
        alert('ERROR!');
        console.log(error);
    });
  }

  AddFile(type: number) {
    if (type === 0) {
      this.FileKS2 = this.fileKS2.nativeElement.files[0];
      this.NameKS2 = this.FileKS2.name;
      this.files = this.fileKS2.nativeElement.files;
      this.parseXLSXtoJSON(this.FileKS2, type);
      this.parseXLSXtoHTML(this.FileKS2, type);
    } else {
      this.FileSmet = this.fileSmeta.nativeElement.files[0];
      this.NameSMETA = this.FileSmet.name;
      this.parseXLSXtoHTML(this.FileSmet, type);
    }
  }

  checkWordStart = [
    'Сметная (договорная) стоимость в соответствии с договором подряда (субподряда)',
    'Составлен(а) в текущих (прогнозных) ценах по состоянию на'];
  checkWordEnd = [
    'ВСЕГО по акту',
    'ВСЕГО по смете'];

  parseXLSXtoHTML(file: File, type: number) {
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
        let index = this.xlsxModel.toString().indexOf(this.checkWordStart[type]);
        this.xlsxModel = this.xlsxModel.toString().substring(index);
        index = this.xlsxModel.toString().indexOf('</tr>');
        this.xlsxModel = this.xlsxModel.toString().substring(index + 5);
        this.xlsxModel = '<html><body><table>' + this.xlsxModel;
        index = this.xlsxModel.toString().indexOf(this.checkWordEnd[type]);
        index = this.xlsxModel.toString().indexOf('</tr>', index);
        this.xlsxModel = this.xlsxModel.toString().substring(0, index + 5);
        this.xlsxModel += '</table></body></html>';
        if (type === 0) {
          this.comlAkt.ks2Text = this.xlsxModel;
        } else { this.comlAkt.estimateText = this.xlsxModel; }
    };
  }

  parseXLSXtoJSON(file: File, type: number) {
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
      if (type === 0) {
        const json = data[firstsheet];
        const JsonSum = json.find(item => item.__EMPTY === 'ВСЕГО по акту');
        this.comlAkt.sum = Number(JsonSum.__EMPTY_28);
        const JsonVat = json.find((item) => item.__EMPTY != null && String(item.__EMPTY).includes('НДС'));
        this.comlAkt.vat = Number(JsonVat.__EMPTY_28);
        const JsonNum = json.find(item => item.__rowNum__ === 20);
        this.comlAkt.documentNumber = String(JsonNum.__EMPTY_23);
      }
    };
  }

  valid(): boolean {
    return !(this.comlAkt.documentNumber === null || this.comlAkt.documentNumber.toString().length === 0
      || this.comlAkt.sum <= 0 || this.comlAkt.vat <= 0 || this.comlAkt.documentTypeId === null
      || this.comlAkt.costTypeId == null || this.comlAkt.objectId == null || this.comlAkt.documentDate == null
      || (this.NameKS2 == null && this.NameSMETA == null) );
  }


}
