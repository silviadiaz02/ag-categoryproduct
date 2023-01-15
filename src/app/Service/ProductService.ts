import { Inject, Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from   "@angular/common/http";
import { Product } from "../Models/Product";

@Injectable({
    providedIn:'root'
})
export class ProductService{
    constructor(private http: HttpClient){}
    
    insertProduct(Product :Product){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',Product,{headers});
    }
    UpdateProduct(Product :Product){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',Product,{headers});
    }
    DeleteProduct(Product :Product){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',Product,{headers});
    }
    GetProduct(Product :number){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.get ('/id='+Product);
    }

}
