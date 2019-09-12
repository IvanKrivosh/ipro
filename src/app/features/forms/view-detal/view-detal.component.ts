import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-view-detal',
  templateUrl: './view-detal.component.html',
  styleUrls: ['./view-detal.component.scss']
})
export class ViewDetalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDetalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idContract: number
    }) {}

  ngOnInit() {
  }

}
