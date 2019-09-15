import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {TitulInfo} from '../../../models/titul-model';
import {DocumentService} from '../../../services/document-service';
import {DictionaryService} from "../../../services/dictionary-service";

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [DocumentService, DictionaryService]
})
export class DocsComponent implements OnInit, AfterViewInit {

  docs: DocInfo[];
  NumTitul: string;
  NumDoc: string;
  description: string;
  sumStart: number;
  sumEnd: number;
  dateStart: string;
  dateEnd: string;
  displayedColumns: string[] = ['id', 'numberTitul', 'documentTypeName', 'number', 'description', 'date', 'sum', 'vatValue', 'departmentName', 'close'];
  activePageDataChunk = [];
  dataSource = new MatTableDataSource(this.docs);
  count = 0;
  pageIndex = 0;
  pageSize = 15;
  lowValue = 0;
  highValue = 15;
  typesDoc = [];
  idType: number;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private documentservice: DocumentService,
              private dictionaryservice: DictionaryService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.dictionaryservice.getDocumentTypes().subscribe( data => {
      this.typesDoc = data;
      this.changeDetectorRefs.detectChanges();
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

  applyFilter() {
    const filterVlaue: Array<{name: string, value: any}> = new Array<{name: string, value: string}>();
    if (this.NumTitul != null && this.NumTitul.length > 0) {
      filterVlaue.push({name: 'numberTitul', value: this.NumTitul});
    }
    if (this.NumDoc != null && this.NumDoc.length > 0) {
      filterVlaue.push({name: 'number', value: this.NumDoc});
    }

    if (this.description != null && this.description.length > 0) {
      filterVlaue.push({name: 'description', value: this.description});
    }

    if (this.sumStart != null && String(this.sumStart).length > 0) {
      filterVlaue.push({name: 'sumStart', value: this.sumStart});
    }

    if (this.sumEnd != null && String(this.sumEnd).length > 0) {
      filterVlaue.push({name: 'sumEnd', value: this.sumEnd});
    }

    if (this.dateStart != null && this.dateStart.length > 0) {
      const d = this.dateStart.split('-');
      const date = new Date(Number(d[0]), Number(d[1]), Number(d[2]));
      filterVlaue.push({name: 'dateStart', value: date.getTime() / 1000});
    }

    if( this.idType != null) {
      filterVlaue.push({name: 'idType', value: this.idType});
    }

    if (this.dateEnd != null && this.dateEnd.length > 0) {
      const d = this.dateEnd.split('-');
      const date = new Date(Number(d[0]), Number(d[1]), Number(d[2]));
      filterVlaue.push({name: 'dateEnd', value: date.getTime() / 1000});
    }

    console.log(filterVlaue);

    this.documentservice.getDocuments(filterVlaue).subscribe(data => {
      this.docs = data;
      this.count = this.docs.length;
      this.activePageDataChunk = this.docs.slice(0, this.pageSize);
      this.dataSource = new MatTableDataSource(this.activePageDataChunk);
      this.dataSource.sort = this.sort;
    });
  }

  clearFilter() {
    this.NumTitul = null;
    this.NumDoc = null;
    this.description = null;
    this.sumStart = null;
    this.sumEnd = null;
    this.dateStart = null;
    this.dateEnd = null;
    this.idType = null;
  }


}
