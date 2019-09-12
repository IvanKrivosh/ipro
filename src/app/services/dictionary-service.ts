import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DepartmentInfo} from '../models/department-model';
import {CostTypeInfo} from '../models/cost-type-model';
import {DocumentKindInfo} from '../models/document-kind-model';
import {DocumentTypeInfo} from '../models/document-type-model';
import {FederationEntityInfo} from '../models/federation-entity-model';
import {InvestmentDirectionInfo} from '../models/investment-direction-model';
import {InvestmentSectionInfo} from '../models/investment-section-model';
import {LimitTypeInfo} from '../models/limit-type-model';
import {TitulStatusInfo} from '../models/titul-status-model';
import {VatPercentInfo} from '../models/vat-percent-model';
import {ObjectModel} from '../models/object-model';

const api = '/api';

@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {
  }

  public getDepartments(): Observable<Array<DepartmentInfo>> {
    return this.http.get<Array<DepartmentInfo>>(`${api}/departments`);
  }

  public getCostTypes(): Observable<Array<CostTypeInfo>> {
    return this.http.get<Array<CostTypeInfo>>(`${api}/costTypes`);
  }

  public getDocumentKinds(): Observable<Array<DocumentKindInfo>> {
    return this.http.get<Array<DocumentKindInfo>>(`${api}/documentKinds`);
  }

  public getDocumentTypes(): Observable<Array<DocumentTypeInfo>> {
    return this.http.get<Array<DocumentTypeInfo>>(`${api}/documentTypes`);
  }

  public getFederationEntities(): Observable<Array<FederationEntityInfo>> {
    return this.http.get<Array<FederationEntityInfo>>(`${api}/federationEntities`);
  }

  public getInvestmentDirections(): Observable<Array<InvestmentDirectionInfo>> {
    return this.http.get<Array<InvestmentDirectionInfo>>(`${api}/investmentDirections`);
  }

  public getInvestmentSections(): Observable<Array<InvestmentSectionInfo>> {
    return this.http.get<Array<InvestmentSectionInfo>>(`${api}/investmentSections`);
  }

  public getLimitTypes(): Observable<Array<LimitTypeInfo>> {
    return this.http.get<Array<LimitTypeInfo>>(`${api}/limitTypes`);
  }

  public getTitulStatuses(): Observable<Array<TitulStatusInfo>> {
    return this.http.get<Array<TitulStatusInfo>>(`${api}/titulStatuses`);
  }

  public getVatPercents(): Observable<Array<VatPercentInfo>> {
    return this.http.get<Array<VatPercentInfo>>(`${api}/vatPercents`);
  }

  public getObjects(): Observable<Array<ObjectModel>> {
    return this.http.get<Array<ObjectModel>>(`${api}/objects`);
  }

}
