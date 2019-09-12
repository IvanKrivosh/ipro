import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ContractService} from '../../../services/contract-service';

@Component({
  selector: 'app-view-detal',
  templateUrl: './view-detal.component.html',
  styleUrls: ['./view-detal.component.scss'],
  providers: [ContractService]
})
export class ViewDetalComponent implements OnInit {

  TypeView = 1;
  detalInfo = 'qwqwdqw';

  constructor(
    private contractservoce: ContractService,
    public dialogRef: MatDialogRef<ViewDetalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      ID: number
    }) {}

  ngOnInit() {

    this.contractservoce.getComplAkts([{ name: 'id', value: this.data.ID }]).subscribe(
      data => {

      }
    );
  }

}
