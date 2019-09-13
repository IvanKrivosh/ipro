import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DocInfo} from '../models/doc-model';

const api = '/api';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getDocuments(): Observable<Array<DocInfo>> {
    return this.http.get<Array<DocInfo>>(`${api}/documents`);
  }

}
