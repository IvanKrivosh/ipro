import {Component, OnInit, ViewChild} from '@angular/core';
import {DogInfo} from '../../../models/dog-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-dogovors',
  templateUrl: './dogovors.component.html',
  styleUrls: ['./dogovors.component.scss']
})
export class DogovorsComponent implements OnInit {

  dogs: DogInfo[];
  constructor() { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.dogs);
  activePageDataChunk = [];
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;
  displayedColumns: string[] = ['num_dog', 'worker', 'subject', 'date_sig', 'date_begin', 'date_end', 'sum', 'sum_compl', 'sum_opl', 'sum_dolg_kred', 'sum_dolg_deb', 'id_status'];

  ngOnInit() {
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

}
