import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ContractService} from '../../../services/contract-service';
import {ComplActModel} from '../../../models/compl-act-model';

@Component({
  selector: 'app-view-detal',
  templateUrl: './view-detal.component.html',
  styleUrls: ['./view-detal.component.scss'],
  providers: [ContractService]
})
export class ViewDetalComponent implements OnInit, AfterViewInit {

  complakt: ComplActModel;
  TypeView = 1;

  constructor(
    private contractservoce: ContractService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ViewDetalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      ID: number
    }) {}

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const viewDoc = document.getElementById('viewDoc');
    this.contractservoce.getComplAkts([{ name: 'id', value: this.data.ID }]).subscribe(
      data => {
        this.complakt = data[0];
        viewDoc.insertAdjacentHTML('afterbegin', this.complakt.ks2Text);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }

  Close() {
    this.dialogRef.close();
  }

}
