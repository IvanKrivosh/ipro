import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface CheckPointSh1Element {
  position: number;
  nm: string;
  ds: string;
}

const ELEMENT_DATA1: CheckPointSh1Element[] = [
  {position: 1, nm: 'Контрольные этапы 2017 год', ds: '2017 год'},
  {position: 2, nm: 'КЭ для ТП', ds: 'с 2019 года'}
];

export interface CheckPointSh2Element {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  c6: string;
  c7: string;
  c8: string;
  c9: string;
  c10: string;
  c11: string;
  c12: string;
  c13: string;
}

const ELEMENT_DATA2: CheckPointSh2Element[] = [
  {
    c1: '1', c2: 'текст', c3: 'да', c4: 'текст', c5: 'текст', c6: 'текст', c7: 'текст', c8: 'текст',
    c9: 'текст', c10: 'текст', c11: 'текст', c12: 'текст', c13: 'текст'
  },
  {
    c1: '1.1', c2: 'текст', c3: 'нет', c4: 'текст', c5: 'текст', c6: 'текст', c7: 'текст', c8: 'текст',
    c9: 'текст', c10: 'текст', c11: 'текст', c12: 'текст', c13: 'текст'
  },
  {
    c1: '1.2', c2: 'текст', c3: 'нет', c4: 'текст', c5: 'текст', c6: 'текст', c7: 'текст', c8: 'текст',
    c9: 'текст', c10: 'текст', c11: 'текст', c12: 'текст', c13: 'текст'
  }
  ,
  {
    c1: '2', c2: 'текст', c3: 'да', c4: 'текст', c5: 'текст', c6: 'текст', c7: 'текст', c8: 'текст',
    c9: 'текст', c10: 'текст', c11: 'текст', c12: 'текст', c13: 'текст'
  }
];

@Component({
  selector: 'app-check-point-sh',
  templateUrl: './check-point-sh.component.html',
  styleUrls: ['./check-point-sh.component.scss']
})
export class CheckPointShComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  displayedColumns1: string[] = ['select', 'position', 'nm', 'ds'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA1);
  displayedColumns2: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  @ViewChild(MatSort, {static: true}) sort1: MatSort;
  @ViewChild(MatSort, {static: true}) sort2: MatSort;

  ID;

  selection = new SelectionModel<CheckPointSh1Element>(false, []);

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataSource1.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
  }

  Return() {
    window.history.back();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CheckPointSh1Element): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}

