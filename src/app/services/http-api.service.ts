import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  private serviceApi: string;
  public GetServiceUrl() {
    return this.serviceApi;
  }
  constructor(public http: HttpClient) {
    this.serviceApi = environment.serviceApi;
  }

  private HttpGet(controller: string, method: string) {
    return this.http.get(`${this.GetServiceUrl()}api/${controller}/${method}`);
  }

  private HttpGetById(controller: string, method: string, idObject: number) {
    return this.http.get(`${this.serviceApi}api/${controller}/${method}/${idObject}`);
  }

  private HttpDelete(controller: string, method: string, idObject: number) {
    return this.http.get(`${this.serviceApi}api/${controller}/${method}/${idObject}`);
  }

  private HttpPost(controller: string, method: string, object: any) {
    return this.http.post(`${this.serviceApi}api/${controller}/${method}`, object);
  }

  public Insert(object: any, controller: string) {
    return this.HttpPost(controller, 'Insert', object).pipe(
      map(data => {
        return data;
      })
    );
  }

  public Update(object: any, controller: string) {
    return this.HttpPost(controller, 'Update', object).pipe(
      map(data => {
        return data;
      })
    );
  }

  public Delete(IdObject: number, controller: string) {
    return this.HttpDelete(controller, 'Delete', IdObject).pipe(
      map(data => {
        return data;
      })
    );
  }

  public GetList(controller: string) {
    return this.HttpGet(controller, 'GetList').pipe(
      map(data => {
        return data;
      })
    );
  }

  public GetValueMethod(controller: string, method: string) {
    return this.HttpGet(controller, method).pipe(
      map(data => {
        return data;
      })
    );
  }
}
