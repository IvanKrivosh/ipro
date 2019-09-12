import {Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {TitulInfo} from '../../../models/titul-model';


const ELEMENT_DATA: DocInfo[] = [
  { id: 1, id_titul: 1113, num_titul: 1000256366, id_type_doc: 1, type_doc: 'Карта схема-объекта', id_vid_doc: 1, num_doc: 'б/н', prim: '----', date : new Date(), sum: 500, sum_nds: 26, direct: 'ДтИПР', close: 1, id_direct: 3, name_doc: 'doc_1.pdf', proc_nds: 20, spec: ''},
  { id: 2, id_titul: 1213, num_titul: 1021256366, id_type_doc: 2, type_doc: 'Карта схема-объекта', id_vid_doc: 1, num_doc: 'б/н 123', prim: 'qfqfqwd', date : new Date(), sum: 250, sum_nds: 10, direct: 'ДтИПР', close: 0, id_direct:2, name_doc: 'doc_2.docx', proc_nds: 10, spec:''}
];

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'num_titul', 'type_doc', 'num_doc', 'prim', 'date', 'sum', 'sum_nds', 'direct', 'close'];
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

  openDoc(elem: TitulInfo) {
    console.log(elem.id);
    this.router.navigate(['/docs/', elem.id]);
  }

}
