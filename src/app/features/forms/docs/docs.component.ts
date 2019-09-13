import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {TitulInfo} from '../../../models/titul-model';
import {DocumentService} from '../../../services/document-service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [DocumentService]
})
export class DocsComponent implements OnInit, AfterViewInit {

  docs: DocInfo[];
  displayedColumns: string[] = ['id', 'numberTitul', 'documentTypeName', 'number', 'description', 'date', 'sum', 'vatValue', 'departmentName', 'close'];
  activePageDataChunk = [];
  dataSource = new MatTableDataSource(this.docs);
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router, private documentservice: DocumentService) { }

  ngAfterViewInit(): void {
    this.documentservice.getDocuments([]).subscribe(data => {
      this.docs = data;
      this.count = this.docs.length;
      this.activePageDataChunk = this.docs.slice(0, this.pageSize);
      this.dataSource = new MatTableDataSource(this.activePageDataChunk);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Кол-во на страницу: ';
    this.paginator._intl.firstPageLabel = 'Первая страница';
    this.paginator._intl.lastPageLabel = 'Последняя страница';
    this.paginator._intl.nextPageLabel = 'Следующая страница';
    this.paginator._intl.previousPageLabel = 'Предыдущая страница';
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

    this.activePageDataChunk = this.docs.slice(firstCut, secondCut);
    this.dataSource = new MatTableDataSource(this.activePageDataChunk);
    this.dataSource.sort = this.sort;
  }

  openDoc(elem: TitulInfo) {
    this.router.navigate(['/docs/', elem.id]);
  }



}
