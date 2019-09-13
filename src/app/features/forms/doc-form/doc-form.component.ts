import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {DocumentService} from '../../../services/document-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DictionaryService} from '../../../services/dictionary-service';
import {UploadService} from '../../../services/upload-service';
import {FileInfo} from '../../../models/file-service';

declare function sign(): any;
declare function verify(): any;

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss'],
  providers: [DocumentService, DictionaryService, UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocFormComponent implements OnInit, AfterViewInit {
  imageSource = 'assets/images/iconEye.png';
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
    idFile: number;
    stringKey: string;
  };

  ID = 0;
  typesDoc = [];
  vidsDoc = [];
  orgs = [];
  procNds = [];
  FileDoc: File;
  @ViewChild('fileDoc', {static: true}) fileDoc;

  displayedColumns: string[] = ['id', 'name', 'createdAt', 'delete'];
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
    this.RefresData();
  }

  RefresData() {
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

  OpenDoc(id, name, type) {
    if (type === 1 && this.FileDoc) {
      const url = window.URL.createObjectURL(this.FileDoc);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } else {
      this.uploadservice.getFile([{name: 'id', value: id}], name);
    }
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
      if (this.FileDoc) {
        this.files = new Set<File>();
        this.files.add(this.FileDoc);
        this.uploadservice.upload(this.files, [{name: 'mainDocId', value: this.docInfo.id}]);
      }
    },error => {
      alert('error');
      console.log(error);
    } );
  }

  DeleteFile(element) {
    if (confirm('Вы действительно хотите удалить данный файл?')) {
      this.uploadservice.deleteFile(element.id.toString()).subscribe(data => {
        this.dataSourceFiles = this.arrayRemove(this.dataSourceFiles, element);
        this.changeDetectorRefs.detectChanges();
      }, error => {
        alert(error.message());
      });
    }
  }

  arrayRemove(arr, value) {
    return arr.filter((item) => {
      return item !== value;
    });
  }

  SigFile() {
    // sign();
    const stringKey = 'gen key rutoken';
    this.uploadservice.updateFile(this.docInfo.idFile, stringKey).subscribe(data => {
    });
  }

  VerifySign() {
    verify();
  }
}
