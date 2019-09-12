import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {TitulInfo} from '../models/titul-model';
import {DogInfo} from '../models/dog-model';
import {ComplActModel} from '../models/compl-act-model';
import {RNOInfo} from '../models/rno-model';

const api = '/api';

@Injectable()
export class ContractService {
  constructor(private http: HttpClient) {}

  public getContracts(): Observable<Array<DogInfo>> {
    return this.http.get<Array<DogInfo>>(`${api}/contracts`);
  }

  public getComplAkts(filterVlaue: Array<{name: string, value: any}>): Observable<Array<ComplActModel>> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
        httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Array<ComplActModel>>(`${api}/acts`, { params: httpParams });
  }

  public getComplRNO(filterVlaue: Array<{name: string, value: any}>): Observable<Array<RNOInfo>> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
        httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Array<RNOInfo>>(`${api}/orders`, { params: httpParams });
  }
}
