import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

class DialogRoleComponent {
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idDoc: number
    }) {}

  ngOnInit() {
  }

}
