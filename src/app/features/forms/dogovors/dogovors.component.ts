import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DogInfo} from '../../../models/dog-model';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {RNOInfo} from '../../../models/rno-model';
import {ComplActModel} from '../../../models/compl-act-model';
import {NewAktComponent} from '../new-akt/new-akt.component';
import {ViewDetalComponent} from '../view-detal/view-detal.component';
import {ContractService} from '../../../services/contract-service';

@Component({
  selector: 'app-dogovors',
  templateUrl: './dogovors.component.html',
  styleUrls: ['./dogovors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ContractService]
})
export class DogovorsComponent implements OnInit, AfterViewInit {

  NumDoc = '';
  currentDog: DogInfo;
  dogs: DogInfo[];
  rno: RNOInfo[];
  akts: ComplActModel[];
  constructor(public dialog: MatDialog, private contractservoce: ContractService, private changeDetectorRefs: ChangeDetectorRef) { }

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

  displayedColumns: string[] = ['id_dog', 'num_dog', 'worker', 'subject', 'date_sig', 'date_begin', 'date_end', 'sum', 'sum_compl', 'sum_opl', 'sum_dolg_kred', 'sum_dolg_deb', 'id_status'];
  displayedColumnsRNO: string[] = ['Number', 'CostTypeName', 'PaymentType', 'PaymentDate', 'Sum', 'Vat'];
  displayedColumnsAkts: string[] = ['documentNumber', 'documentTypeName', 'costTypeName', 'documentDate', 'sum', 'vat', 'contractId'];

  ngAfterViewInit(): void {

    this.contractservoce.getContracts().subscribe(data => {
      this.dogs = data;
      this.currentDog = this.dogs[0];
      this.NumDoc = this.currentDog.number;
      this.count = this.dogs.length;
      this.activePageDataChunk = this.dogs.slice(0, this.pageSize);
      this.dataSource = new MatTableDataSource(this.activePageDataChunk);
      this.dataSource.sort = this.sort;
      this.fillChildTable();
    });
  }

  fillChildTable() {
    if (this.currentDog != null) {

      this.contractservoce.getComplAkts([{name: 'contractId', value: this.currentDog.id}]).subscribe( data => {
        this.akts = data;
        this.dataSourceAkts = new MatTableDataSource(this.akts);
        this.changeDetectorRefs.detectChanges();
      });

      this.contractservoce.getComplRNO([{name: 'contractId', value: this.currentDog.id}]).subscribe( data => {
        this.rno = data;
        this.dataSourceRNO = new MatTableDataSource(this.rno);
        this.changeDetectorRefs.detectChanges();
      });

    }
  }

  ngOnInit() {
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
    const dialogRef = this.dialog.open(ViewDetalComponent, {
      id: 'DialogDetal',
      width: '1500px',
      height: '80vh',
      data: {
        ID: element.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  AddAkt() {
    const dialogRef = this.dialog.open(NewAktComponent, {
      width: '700px',
      data: {
        numContract: this.currentDog.number,
        idContract: this.currentDog.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fillChildTable();
      }
    });
  }

  selectRow(row) {
    if (this.currentDog.id !== row.id) {
      this.currentDog = row;
      this.NumDoc = this.currentDog.number;
      this.fillChildTable();
    }
  }


}
