import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ControlStepTemplateModel} from '../models/control-step-template-model';
import {ControlStepJobModel} from '../models/control-step-job-model';
import {ControlStepTitulModel} from '../models/control-step-titul-model';

const api = '/api';

@Injectable()
export class ControlStepService {
  constructor(private http: HttpClient) {
  }

  public getControlStepTemplates(): Observable<Array<ControlStepTemplateModel>> {
    return this.http.get<Array<ControlStepTemplateModel>>(`${api}/controlStepTemplates`);
  }

  public getControlStepJobs(controlStepTemplateId: number): Observable<Array<ControlStepJobModel>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('templateId', controlStepTemplateId.toString());
    return this.http.get<Array<ControlStepJobModel>>(`${api}/controlStepJobs`, {params: httpParams});
  }

  public createTitulControlSteps(titulId: number, controlStepTemplateId: number) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('templateId', controlStepTemplateId.toString());
    httpParams = httpParams.append('titulId', titulId.toString());
    return this.http.post(`${api}/titulControlSteps`, httpParams);
  }

  public getTitulControlStepJobs(titulId: number, controlStepTemplateId: number): Observable<Array<ControlStepTitulModel>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('titulId', titulId.toString());
    httpParams = httpParams.append('templateId', controlStepTemplateId.toString());
    return this.http.get<Array<ControlStepTitulModel>>(`${api}/titulControlStepJobs`, {params: httpParams});
  }
}
