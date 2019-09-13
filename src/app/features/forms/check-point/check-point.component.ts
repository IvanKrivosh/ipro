import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';

export interface CheckPointElement {
  pp: string;
  vd: string;
  nm: string;
  pb: Date;
  pe: Date;
  pd: number;
  fb: Date;
  fe: Date;
  fd: number;
  ot: number;
  pr: string;
  kr: string;
  ps: number;
  fs: number;
  pv: string;
  sd: string;
}

const ELEMENT_DATA: CheckPointElement[] = [
  {
    pp: '1', vd: 'текст', nm: 'текст',
    pb: randomDate(new Date(2000, 1, 1), new Date()),
    pe: randomDate(new Date(2000, 1, 1), new Date()), pd: 0,
    fb: randomDate(new Date(2000, 1, 1), new Date()),
    fe: randomDate(new Date(2000, 1, 1), new Date()), fd: 0,
    ot: 0, pr: 'текст', kr: 'текст', ps: 0, fs: 0, pv: 'текст', sd: 'текст'
  },
  {
    pp: '1.1', vd: 'текст', nm: 'текст',
    pb: randomDate(new Date(2000, 1, 1), new Date()),
    pe: randomDate(new Date(2000, 1, 1), new Date()), pd: 0,
    fb: randomDate(new Date(2000, 1, 1), new Date()),
    fe: randomDate(new Date(2000, 1, 1), new Date()), fd: 0,
    ot: 0, pr: 'текст', kr: 'текст', ps: 0, fs: 0, pv: 'текст', sd: 'текст'
  },
  {
    pp: '1.2', vd: 'текст', nm: 'текст',
    pb: randomDate(new Date(2000, 1, 1), new Date()),
    pe: randomDate(new Date(2000, 1, 1), new Date()), pd: 0,
    fb: randomDate(new Date(2000, 1, 1), new Date()),
    fe: randomDate(new Date(2000, 1, 1), new Date()), fd: 0,
    ot: 0, pr: 'текст', kr: 'текст', ps: 0, fs: 0, pv: 'текст', sd: 'текст'
  },
  {
    pp: '2', vd: 'текст', nm: 'текст',
    pb: randomDate(new Date(2000, 1, 1), new Date()),
    pe: randomDate(new Date(2000, 1, 1), new Date()), pd: 0,
    fb: randomDate(new Date(2000, 1, 1), new Date()),
    fe: randomDate(new Date(2000, 1, 1), new Date()), fd: 0,
    ot: 0, pr: 'текст', kr: 'текст', ps: 0, fs: 0, pv: 'текст', sd: 'текст'
  }
];

@Component({
  selector: 'app-check-point',
  templateUrl: './check-point.component.html',
  styleUrls: ['./check-point.component.scss']
})
export class CheckPointComponent implements OnInit {
  checkpointsh = 'checkpointsh';
  // @ts-ignore
  positionOptions: TooltipPosition[] = ['Шаблон №1', 'Шаблон №2'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['pp', 'vd', 'nm', 'pb', 'pe', 'pd', 'fb', 'fe', 'fd', 'ot', 'pr', 'kr', 'ps', 'fs', 'pv', 'sd'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ID;
  format = 'dd/MM/yyyy';

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataSource.sort = this.sort;
  }

  Return() {
    window.history.back();
  }

  redirect() {
    this.router.navigateByUrl('/checkpointsh');
  }
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
