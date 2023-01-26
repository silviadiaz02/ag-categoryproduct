import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ProductModel } from '../models/productModel';
import { HttpApiService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HttpApiService {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }

  GetByIdProduct(idProduct : number){
    const uri = `${this.GetServiceUrl()}Product/GetById/${idProduct}`;
    let headers = new HttpHeaders();
    return this.http.get<Blob>(uri, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  GetListProduct(){
    const uri = `${this.GetServiceUrl()}Product/GetList`;
    let headers = new HttpHeaders();
    return this.http.get<Blob>(uri, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  InsertProduct(productForm: ProductModel){
    const uri = `${this.GetServiceUrl()}Product/Insert`;
    let headers = new HttpHeaders();
    return this.http.post<Blob>(uri, productForm, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  UpdateProduct(productForm: ProductModel){
    const uri = `${this.GetServiceUrl()}Product/Update`;
    let headers = new HttpHeaders();
    return this.http.post<Blob>(uri, productForm, { headers: headers })
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  DeleteProduct(idProduct : number){
    const uri = `${this.GetServiceUrl()}Product/Delete/${idProduct}`;
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
