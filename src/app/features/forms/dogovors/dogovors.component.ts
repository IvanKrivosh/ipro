import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DogInfo} from '../../../models/dog-model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RNOInfo} from '../../../models/rno-model';
import {ComplActModel} from '../../../models/compl-act-model';
import {NewAktComponent} from '../new-akt/new-akt.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dogovors',
  templateUrl: './dogovors.component.html',
  styleUrls: ['./dogovors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DogovorsComponent implements OnInit {

  currentDog: DogInfo;
  dogs: DogInfo[];
  rno: RNOInfo[];
  akts: ComplActModel[];
  constructor(public dialog: MatDialog) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.dogs);
  dataSourceRNO = new MatTableDataSource(this.rno);
  dataSourceAkts = new MatTableDataSource(this.akts);

  activePageDataChunk = [];
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;

  displayedColumns: string[] = ['num_dog', 'worker', 'subject', 'date_sig', 'date_begin', 'date_end', 'sum', 'sum_compl', 'sum_opl', 'sum_dolg_kred', 'sum_dolg_deb', 'id_status'];
  displayedColumnsRNO: string[] = ['Number', 'CostTypeName', 'PaymentType', 'PaymentDate', 'Sum', 'Vat'];
  displayedColumnsAkts: string[] = ['DocumentNumber', 'DocumentTypeName', 'CostTypeName', 'DocumentDate', 'Sum', 'Vat', 'ContractId'];

  ngOnInit() {

    this.rno = [{
      ContractId: 123,
      NumContract: 'ljwujw',
      Number: 'qwqwd',
      CostTypeId: 1,
      CostTypeName: 'Проектно-изысканные работы',
      PaymentType: 'погашение КЗ',
      PaymentDate: new Date(),
      Sum: 500,
      Vat: 15
    }];

    this.akts = [
      {
        ContractId: 123,
        DocumentNumber: '123123',
        DocumentTypeId: 11,
        DocumentTypeName: 'КС-2',
        CostTypeId: 1,
        CostTypeName: 'wefwefwe',
        DocumentDate: new Date(),
        Sum: 1231,
        Vat: 52
      }
    ];

    this.dataSourceRNO = new MatTableDataSource(this.rno);
    this.dataSourceAkts = new MatTableDataSource(this.akts);

    this.dogs = [
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },{
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      },
      {
        id: 123,
        num_dog: '13241234123',
        id_worker: 1,
        worker: 'Подрядчик',
        subject: 'Предмет',
        date_sig: new Date(),
        date_begin: new Date(),
        date_end: new Date(),
        sum: 150000,
        sum_compl: 15000,
        sum_opl: 10000,
        sum_dolg_kred: 500,
        sum_dolg_deb: 0,
        id_status: 'Выполнен'
      }];

    this.currentDog = this.dogs[0];
    this.count = this.dogs.length;
    this.activePageDataChunk = this.dogs.slice(0, this.pageSize);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;

    this.paginator._intl.itemsPerPageLabel = 'Кол-во на страницу: ';
  }

  getPaginatorData(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;

    const firstCut = event.pageIndex * event.pageSize;
    const secondCut = firstCut + event.pageSize;

    this.activePageDataChunk = this.dogs.slice(firstCut, secondCut);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;
  }

  OpenDetal(element) {
  }
  xlsxModel: any;
  AddAkt() {
    const dialogRef = this.dialog.open(NewAktComponent, {
      width: '700px',
      data: {
        idContract: this.currentDog.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      const data = {};
      const target: DataTransfer = (<DataTransfer> ( result));
      const reader = new FileReader();
      reader.onload = (file: any) => {
        const wb = XLSX.read(file.target.result,{ type: 'binary' });
        wb.SheetNames.forEach((name) => {
          data[name.trim()] = XLSX.utils.sheet_to_html(wb.Sheets[name]);
        });
      };
      reader.readAsBinaryString(target[0]);
      this.xlsxModel = data;
      console.log(data);
    });
  }

}
