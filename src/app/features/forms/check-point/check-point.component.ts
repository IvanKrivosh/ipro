import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-check-point',
  templateUrl: './check-point.component.html',
  styleUrls: ['./check-point.component.scss']
})
export class CheckPointComponent implements OnInit {
  ID;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
  }

  Return() {
    window.history.back();
  }

}
