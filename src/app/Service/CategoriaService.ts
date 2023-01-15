import { Inject, Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from   "@angular/common/http";
import { Category } from "../Models/Category";

@Injectable({
    providedIn:'root'
})
export class CategoryService{
    constructor(private http: HttpClient){}

    insertCategory(categoria :Category){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',categoria,{headers});
    }
    UpdateCategory(categoria :Category){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',categoria,{headers});
    }
    DeleteCategory(categoria :Category){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        this.http.post ('',categoria,{headers});
    }
    GetCategory(categoria :number){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.get ('/id='+categoria);
    }
    GetCategorys(){
        var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.get ('');
    }

}
