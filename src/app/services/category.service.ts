import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoryModel } from '../models/categoryModel';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends HttpApiService {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }

  GetByIdCategory(idCategory : number){
    const uri = `${this.GetServiceUrl()}Category/GetById/${idCategory}`;
    let headers = new HttpHeaders();
    return this.http.get<Blob>(uri, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  GetListCategory(){
    const uri = `${this.GetServiceUrl()}Category/GetList`;
    let headers = new HttpHeaders();
    return this.http.get<Blob>(uri, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  InsertCategory(categoryForm: CategoryModel){
    const uri = `${this.GetServiceUrl()}Category/Insert`;
    let headers = new HttpHeaders();
    return this.http.post<Blob>(uri, categoryForm, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  UpdateCategory(productForm: CategoryModel){
    const uri = `${this.GetServiceUrl()}Category/Update`;
    let headers = new HttpHeaders();
    return this.http.post<Blob>(uri, productForm, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  DeleteCategory(idProduct : number){
    const uri = `${this.GetServiceUrl()}Category/Delete/${idProduct}`;
    let headers = new HttpHeaders();
    return this.http.get<Blob>(uri, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  handlerError(err : any): Observable<never> {
    let errorMessage = `Ha ocurrido un error`;
    if(err){
      errorMessage = `Error : ${err.message}`
    }

    console.error(err);
    return throwError(()=> errorMessage)
  }
}
