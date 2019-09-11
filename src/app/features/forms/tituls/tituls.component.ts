import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';


export interface PeriodicElement {
  id: number;
  num_titul: number;
  type: string;
  name_titul: string;
  direct_customer: string;
  direct_executor: string;
  begin: string;
  end: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1123, num_titul: 1000256366, type: 'О', name_titul: 'цуа уа цу цуацуацуацуа цуаукукп', direct_customer: 'ДирДСО', direct_executor : 'ДирДСО', begin: 'январь 2004', end: 'декабрь 2021'},
  { id: 1223, num_titul: 1002356366, type: 'О', name_titul: 'аиукп23кп 23к 23к 23к', direct_customer: 'ДирДСО', direct_executor : 'ДирДСО', begin: 'январь 2006', end: 'декабрь 2029'}
];

@Component({
  selector: 'app-tituls',
  templateUrl: './tituls.component.html',
  styleUrls: ['./tituls.component.scss']
})
export class TitulsComponent implements OnInit {

  orgs = [{name: 'Подразделение №1', id : 1}, {name: 'Подразделение №2', id : 2}, {name: 'Подразделение №3', id : 3}];

  NumProject: string;
  NameProject: string;
  Year: number;

  displayedColumns: string[] = ['id', 'num_titul', 'type', 'name_titul', 'direct_customer', 'direct_executor', 'begin', 'end'];
  activePageDataChunk = [];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router) { }

  ngOnInit() {
    this.count = ELEMENT_DATA.length;
    this.activePageDataChunk = ELEMENT_DATA.slice(0, this.pageSize);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;

    this.paginator._intl.itemsPerPageLabel = 'Кол-во на страницу: ';
    this.paginator._intl.firstPageLabel = 'Первая страница';
    this.paginator._intl.lastPageLabel = 'Последняя страница';
    this.paginator._intl.nextPageLabel = 'Следующая страница';
    this.paginator._intl.previousPageLabel = 'Предыдущая страница';
  }

  applyFilter() {
  }

  clearFilter() {
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

    this.activePageDataChunk = ELEMENT_DATA.slice(firstCut, secondCut);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;
  }

  OpenTitul(elem: PeriodicElement){
    this.router.navigate(['/tituls/', elem.id]);
  }
}
