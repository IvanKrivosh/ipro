import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {FileInfo} from '../models/file-service';
import {map} from 'rxjs/operators';
import {DocInfo} from '../models/doc-model';

const api = '/api';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public getFile(filterVlaue: Array<{name: string, value: any}>): Observable<Blob> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
        httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Blob>(`${api}/file`, { params: httpParams, responseType: 'blob' as 'json' });
  }

  downloadFile(filterVlaue: Array<{name: string, value: any}>, name: string) {
    this.getFile(filterVlaue).pipe(map( res => {
      {
        return {
          filename: name,
          data: res
        };
      }
    })).subscribe( res => {
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      // window.open(url);
      a.remove();
    });
  }

  deleteFile(id: string) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.delete(`${api}/file`, { params: urlParams });
  }

  updateFile(id: number, strKey: string) {
    const key = {stringKey: strKey};
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.put(`${api}/file`, key, { params: urlParams });
  }

  public getFiles(filterVlaue: Array<{name: string, value: any}>): Observable<Array<FileInfo>> {
    let httpParams = new HttpParams();
    if (filterVlaue) {
      for (const filter of filterVlaue) {
        httpParams = httpParams.append(filter.name, filter.value);
      }
    }
    return this.http.get<Array<FileInfo>>(`${api}/files`, { params: httpParams });
  }

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
