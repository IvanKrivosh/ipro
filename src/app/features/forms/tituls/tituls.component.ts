import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatSort} from '@angular/material';
import {Router} from '@angular/router';
import {TitulService} from '../../../services/titul-service';
import {TitulInfo} from '../../../models/titul-model';

@Component({
  selector: 'app-tituls',
  templateUrl: './tituls.component.html',
  styleUrls: ['./tituls.component.scss'],
  providers: [TitulService]
})
export class TitulsComponent implements OnInit {

  orgs = [{name: 'Подразделение №1', id : 1}, {name: 'Подразделение №2', id : 2}, {name: 'Подразделение №3', id : 3}];

  NumProject: string;
  NameProject: string;
  Year: number;
  IdOrg: number;
  TypeOrg = 1;

  displayedColumns: string[] = ['id', 'number', 'name', 'direct_customer', 'direct_executor', 'begin', 'end'];
  activePageDataChunk = [];
  tituls: TitulInfo[];
  dataSource = new MatTableDataSource(this.tituls);
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private titulservice: TitulService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {

    this.paginator._intl.itemsPerPageLabel = 'Кол-во на страницу: ';
    this.paginator._intl.firstPageLabel = 'Первая страница';
    this.paginator._intl.lastPageLabel = 'Последняя страница';
    this.paginator._intl.nextPageLabel = 'Следующая страница';
    this.paginator._intl.previousPageLabel = 'Предыдущая страница';
  }

  applyFilter() {
    const filterVlaue: Array<{name: string, value: any}> = new Array<{name: string, value: string}>();
    if (this.NumProject != null && this.NumProject.length > 0) {
      filterVlaue.push({name: 'number', value: this.NumProject});
    }
    if (this.NameProject != null && this.NameProject.length > 0) {
      filterVlaue.push({name: 'name', value: this.NameProject});
    }
    if (this.IdOrg != null) {
      if (this.TypeOrg === 1) {
          filterVlaue.push({name: 'customerId', value: this.IdOrg});
        } else {
          filterVlaue.push({name: 'performerId', value: this.IdOrg});
      }
    }
    if (this.Year != null) {
      filterVlaue.push({name: 'year', value: this.Year});
    }
    this.titulservice.getTituls(filterVlaue).subscribe( data => {
      this.tituls = data;
      console.log(data);
      this.count = this.tituls.length;
      this.activePageDataChunk = this.tituls.slice(0, this.pageSize);
      this.dataSource = new MatTableDataSource(this.activePageDataChunk);
      this.dataSource.sort = this.sort;

      this.changeDetectorRefs.detectChanges();
    });
  }

  clearFilter() {
    this.Year = null;
    this.IdOrg = null;
    this.NameProject = null;
    this.NumProject = null;
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

    this.activePageDataChunk = this.tituls.slice(firstCut, secondCut);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;
  }

  OpenTitul(elem: TitulInfo) {
    this.router.navigate(['/tituls/', elem.id]);
  }
}
