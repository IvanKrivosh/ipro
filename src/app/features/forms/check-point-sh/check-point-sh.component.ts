import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface CheckPointSh1Element {
  nm: string;
  ds: string;
  pn: string;
}

const ELEMENT_DATA1: CheckPointSh1Element[] = [
  {nm: 'Контрольные этапы 2017 год', ds: '2017 год', pn: '1'},
  {nm: 'КЭ для ТП', ds: 'с 2019 года', pn: '2'}
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
  c14: string;
  c15: string;
}

const ELEMENT_DATA2: CheckPointSh2Element[] = [
  {c1: '1', c2: 'A', c3: 'A', c4: 'A', c5: 'A', c6: 'A', c7: 'A', c8: 'A',
    c9: 'A', c10: 'A', c11: 'A', c12: 'A', c13: 'A', c14: 'A', c15: 'A'},
  {c1: '2', c2: 'A', c3: 'A', c4: 'A', c5: 'A', c6: 'A', c7: 'A', c8: 'A',
    c9: 'A', c10: 'A', c11: 'A', c12: 'A', c13: 'A', c14: 'A', c15: 'A'},
  {c1: '3', c2: 'A', c3: 'A', c4: 'A', c5: 'A', c6: 'A', c7: 'A', c8: 'A',
    c9: 'A', c10: 'A', c11: 'A', c12: 'A', c13: 'A', c14: 'A', c15: 'A'}
];

@Component({
  selector: 'app-check-point-sh',
  templateUrl: './check-point-sh.component.html',
  styleUrls: ['./check-point-sh.component.scss']
})
export class CheckPointShComponent implements OnInit {
  displayedColumns1: string[] = ['nm', 'ds', 'pn'];
  dataSource1 = new MatTableDataSource(ELEMENT_DATA1);
  displayedColumns2: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15'];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ID;
  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataSource1.sort = this.sort;
    this.dataSource2.sort = this.sort;
  }

  Return() {
    window.history.back();
  }
}

