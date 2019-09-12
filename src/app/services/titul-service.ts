import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {TitulInfo} from '../models/titul-model';

const api = '/api';

@Injectable()
export class TitulService {
  constructor(private http: HttpClient) {}

  public getTituls(filterVlaue: Array<{name: string, value: any}>): Observable<Array<TitulInfo>> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
          httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Array<TitulInfo>>(`${api}/tituls`, { params: httpParams });
  }
}
