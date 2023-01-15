import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Category } from '../Models/Category';
import { CategoryService } from '../Service/CategoriaService';
import { ProductService } from '../Service/ProductService';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  Categorias: any;
  objCategoria :any;
  FrmCat:boolean = false;
  constructor(private categoriaService :CategoryService,
    private productoService : ProductService) { }
  
  ngOnInit(): void {
    this.categoriaService.GetCategorys()
    .subscribe(result => this.Categorias = result);
  }
  getCategoria(categoria:Category){
    this.categoriaService.GetCategory(categoria.idcategoria)
    .subscribe(result =>{
       this.objCategoria = result;
      this.FrmCat = true}
       );

  }



}
