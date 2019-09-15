import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DocInfo} from '../models/doc-model';
import {ComplActModel} from "../models/compl-act-model";

const api = '/api';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  public getDocuments(filterVlaue: Array<{name: string, value: any}>): Observable<Array<DocInfo>> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
        httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Array<DocInfo>>(`${api}/documents`, { params: httpParams });
  }

  updateDocs(id: number, doc: DocInfo) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.put(`${api}/document`, doc, { params: urlParams});
  }

  createDoc(idTitul: number) {
    const docum = {titulId: idTitul};
    return this.http.post<ComplActModel>(`${api}/document`, docum);
  }
}
