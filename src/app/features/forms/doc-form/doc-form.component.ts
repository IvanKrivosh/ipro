import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DocInfo} from '../../../models/doc-model';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {DocumentService} from '../../../services/document-service';
import {ActivatedRoute, Router} from '@angular/router';
import {DictionaryService} from '../../../services/dictionary-service';


@Component({
  selector: 'app-doc-form',
  templateUrl: './doc-form.component.html',
  styleUrls: ['./doc-form.component.scss'],
  providers: [DocumentService, DictionaryService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocFormComponent implements OnInit, AfterViewInit {

  docInfo: DocInfo;
  ID = 0;
  typesDoc = [];
  vidsDoc = [];
  orgs = [];
  procNds = [];

  displayedColumns: string[] = ['id', 'type_doc', 'num_doc', 'date_start'];
  dataSource = [
    {id: 1, type_doc: 'Тип 1', num_doc: '21323-123', date: new Date()},
    {id: 2, type_doc: 'Тип 2', num_doc: '12312', date: new Date()},
    {id: 3, type_doc: 'Тип 3', num_doc: 'б/н', date: new Date()},
  ];

  @ViewChild('file', {static: true}) file;
  files: Set<File> = new Set();

  constructor(private activatedRoute: ActivatedRoute,
              private dictionaryservice: DictionaryService,
              public dialog: MatDialog,
              private documentservice: DocumentService,
              private changeDetectorRefs: ChangeDetectorRef,
              private router: Router) {}

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

  }

  OpenDoc(element) {

  }

  uploadDocs() {

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

    });
  }

  Return() {
    this.router.navigateByUrl('/docs');
  }

  saveDoc() {

  }
}
