import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {forkJoin} from 'rxjs';
import {UploadService} from '../../../services/upload-service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit {

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  constructor(
    private uploadService: UploadService,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      idDoc: number,
      files: Set<File>
    }) {}

  ngOnInit() {
  }

  closeForm() {
    this.dialogRef.close();
  }

  uploadFile() {

    this.uploading = true;

    this.progress = this.uploadService.upload(this.data.files, [{name: 'documentId', value: this.data.idDoc}]);

    const allProgressObservables = [];
    for (const key of Object.keys(this.progress)) {
      allProgressObservables.push(this.progress[key].progress);
    }

    this.primaryButtonText = 'Finish';
    this.canBeClosed = false;
    this.showCancelButton = false;

    forkJoin(allProgressObservables).subscribe(end => {
      this.canBeClosed = true;
      this.uploadSuccessful = true;
      this.uploading = false;
    });

  }

}
