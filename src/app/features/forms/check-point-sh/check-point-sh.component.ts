import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-check-point-sh',
  templateUrl: './check-point-sh.component.html',
  styleUrls: ['./check-point-sh.component.scss']
})
export class CheckPointShComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  Return() {
    window.history.back();
  }
}
