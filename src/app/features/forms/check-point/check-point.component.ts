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
  pb: string;
  pe: string;
  pd: string;
  fb: string;
  fe: string;
  fd: string;
  ot: string;
  pr: string;
  kr: string;
  ps: string;
  fs: string;
  pv: string;
  sd: string;
}

const ELEMENT_DATA: CheckPointElement[] = [
  {pp: '1', vd: '1', nm: '1', pb: '1', pe: '1', pd: '1', fb: '1', fe: '1',
    fd: '1', ot: '1', pr: '1', kr: '1', ps: '1', fs: '1', pv: '1', sd: '1'},
  {pp: '2', vd: '1', nm: '1', pb: '1', pe: '1', pd: '1', fb: '1', fe: '1',
    fd: '1', ot: '1', pr: '1', kr: '1', ps: '1', fs: '1', pv: '1', sd: '1'},
  {pp: '3', vd: '1', nm: '1', pb: '1', pe: '1', pd: '1', fb: '1', fe: '1',
    fd: '1', ot: '1', pr: '1', kr: '1', ps: '1', fs: '1', pv: '1', sd: '1'},
  {pp: '4', vd: '1', nm: '1', pb: '1', pe: '1', pd: '1', fb: '1', fe: '1',
    fd: '1', ot: '1', pr: '1', kr: '1', ps: '1', fs: '1', pv: '1', sd: '1'}
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

  ID;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
