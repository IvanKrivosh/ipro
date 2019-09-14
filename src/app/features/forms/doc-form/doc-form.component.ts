import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {DocumentService} from '../../../services/document-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DictionaryService} from '../../../services/dictionary-service';
import {UploadService} from '../../../services/upload-service';
import {FileInfo} from '../../../models/file-service';

declare function sign(value: Uint8Array): any;
declare function verify(): any;

@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss'],
  providers: [DocumentService, DictionaryService, UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocFormComponent implements OnInit, AfterViewInit, OnDestroy {
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
    mainFileName: string;
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
      this.uploadservice.downloadFile([{name: 'id', value: id}], name);
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
    this.docInfo.mainFileName = this.FileDoc.name;
    this.docInfo.stringKey = null;
    if (this.FileDoc) {
      this.files = new Set<File>();
      this.files.add(this.FileDoc);
      this.uploadservice.upload(this.files, [{name: 'mainDocId', value: this.docInfo.id}]);
    }
  }

  Return() {
    this.router.navigateByUrl('/docs');
  }

  saveDoc() {
    this.documentservice.updateDocs(this.docInfo.id, this.docInfo).subscribe(data => {
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
    if (!this.FileDoc) {
      this.uploadservice.getFile([{name: 'id', value: this.docInfo.idFile}]).subscribe( data => {
        this.GenSignKey(data);
      });
    } else {
      this.GenSignKey(this.FileDoc as Blob);  }
  }

  GenSignKey(value: Blob) {
    new Response(value).arrayBuffer().then( res => {
      const bytes = new Uint8Array( res );
      const Key = sign(bytes); // Передача на подпись Uint8Array полученного из Blob
      if (Key && String(Key).length > 0) {
        const stringKey = String(Key);
        this.uploadservice.updateFile(this.docInfo.idFile, stringKey).subscribe(data => {
          this.docInfo.isClosed = true;
          alert('Файл успешно подписан');
          this.documentservice.updateDocs(this.docInfo.id, this.docInfo).subscribe(file => {
            this.RefresData();
          });
        });
      }
    });
  }

  VerifySign() {
    verify();
  }

  ngOnDestroy(): void {
    if (this.fileDoc) { this.fileDoc = null; }
  }
}
