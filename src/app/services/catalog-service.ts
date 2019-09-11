import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const api = '/api';

@Injectable()
export class CatalogService {
  constructor(private http: HttpClient) {}

  getOrgs(): Observable<Array<{id: number, name: string}>> {
    return this.http.get<Array<{id: number, name: string}>>(`${api}/tag_types`);
  }
}
