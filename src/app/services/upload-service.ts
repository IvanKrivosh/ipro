import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const api = '/api';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(files: Set<File>, filterVlaue: Array<{name: string, value: any}>): { [key: string]: { progress: Observable<number> } } {

    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {

      let httpParams = new HttpParams();
      if (filterVlaue) {
        for (const filter of filterVlaue) {
          httpParams = httpParams.append(filter.name, filter.value);
        }
      }
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const req = new HttpRequest('POST', `${api}/upload`,  formData, {
        reportProgress: true,
        params: httpParams
      });

      const progress = new Subject<number>();

      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);

        } else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });

      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    return status;
  }
}
