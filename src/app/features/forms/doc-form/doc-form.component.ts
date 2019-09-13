import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {DocumentService} from '../../../services/document-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DictionaryService} from '../../../services/dictionary-service';
import {UploadService} from '../../../services/upload-service';
import {FileInfo} from '../../../models/file-service';
import {error} from 'util';


@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss'],
  providers: [DocumentService, DictionaryService, UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocFormComponent implements OnInit, AfterViewInit {

  docInfo: DocInfo = new class implements DocInfo {
    comments: string;
    date: Date;
    departmentId: number;
    departmentName: string;
    description: string;
    documentKindId: number;
    documentTypeId: number;
    documentTypeName: string;
    filePath: string;
    id: number;
    isClosed: boolean;
    number: string;
    numberTitul: string;
    sum: number;
    titulId: number;
    vatPercentId: number;
    vatValue: number;
  };

  ID = 0;
  typesDoc = [];
  vidsDoc = [];
  orgs = [];
  procNds = [];
  FileDoc: File;
  @ViewChild('fileDoc', {static: true}) fileDoc;

  displayedColumns: string[] = ['id', 'name', 'createdAt'];
  dataSourceFiles: FileInfo[];

  @ViewChild('file', {static: true}) file;
  files: Set<File> = new Set();

  constructor(private activatedRoute: ActivatedRoute,
              private dictionaryservice: DictionaryService,
              public dialog: MatDialog,
              private documentservice: DocumentService,
              private changeDetectorRefs: ChangeDetectorRef,
              private router: Router,
              private uploadservice: UploadService
              ) {}

  ngOnInit() {
    this.ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    this.documentservice.getDocuments([{name: 'id', value: this.ID}]).subscribe(data => {
      this.docInfo = data[0];
      this.changeDetectorRefs.detectChanges();
    });

    this.dictionaryservice.getDocumentTypes().subscribe( data => {
      this.typesDoc = data;
      this.changeDetectorRefs.detectChanges();
    });

    this.dictionaryservice.getDocumentKinds().subscribe( data => {
      this.vidsDoc = data;
      this.changeDetectorRefs.detectChanges();
    });

    this.dictionaryservice.getDepartments().subscribe( data => {
      this.orgs = data;
      this.changeDetectorRefs.detectChanges();
    });

    this.dictionaryservice.getVatPercents().subscribe( data => {
      this.procNds = data;
      this.changeDetectorRefs.detectChanges();
    });

    this.dictionaryservice.getVatPercents().subscribe( data => {
      this.procNds = data;
      this.changeDetectorRefs.detectChanges();
    });

    this.uploadservice.getFiles([{name: 'documentId', value: this.ID}]).subscribe(data => {
      this.dataSourceFiles = data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  OpenDoc(element) {
    this.uploadservice.getFile([{name: 'id', value: element.id}], element.name);
  }

  uploadDocs() {
    this.files = new Set();
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '700px',
      data: {
        idDoc: this.docInfo.id,
        files: this.files
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadservice.getFiles([{name: 'documentId', value: this.ID}]).subscribe(data => {
          this.dataSourceFiles = data;
          this.changeDetectorRefs.detectChanges();
        });
      }
    });
  }

  AddFile() {
    this.FileDoc = this.fileDoc.nativeElement.files[0];
    this.docInfo.filePath = this.FileDoc.name;
  }

  Return() {
    this.router.navigateByUrl('/docs');
  }

  saveDoc() {
    this.documentservice.updateDocs(this.docInfo.id, this.docInfo).subscribe(data => {
      console.log(data);
    },error => {
      alert('error');
      console.log(error);
    } );
  }
}
