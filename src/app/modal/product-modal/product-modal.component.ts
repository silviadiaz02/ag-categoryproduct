import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/categoryModel';
import { ModalData } from 'src/app/models/modalData';
import { ProductModel } from 'src/app/models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() productModel!: ModalData;
  @Output() onNoClick = new EventEmitter();
  productForm!: ProductModel;
  categorySource! : CategoryModel[];
  constructor(
    private serviceProduct: ProductService,
    private serviceCategory: CategoryService
  ) { 
    this.getCategory();
  }

  ngOnInit(): void {
    if(this.productModel.object == null){
       this.productForm = {
        idproducto: 0,
        idcategoria: 0,
        codigo : '',
        nombre : '',
        precioVenta: 0,
        stock: 0,
        descripcion: '',
        imagen: '',
        estado: true
      } 
    }
    else{
      this.productForm = this.productModel.object as ProductModel;
    }
  }
  selectedFile: any = null;

  InsertProduct() {
    let inputProduct =  this.getInputProduct(this.productForm);
    this.serviceProduct.InsertProduct(inputProduct)
    .subscribe(
      {
        next: (result : any) => {
          console.log("Resultado :", result);
          if(result !== null){
            console.log("Inserto el registro");
          }
          else{
            console.log("Salio error");
          }
        },
        error:(err) => {
          console.log("Salio error"+ err);
        }
      }
    )
  }

  UpdateProduct() {
    let inputProduct =  this.getInputProduct(this.productForm);
    this.serviceProduct.UpdateProduct(inputProduct)
    .subscribe(
      {
        next: (result : any) => {
          console.log("Resultado :", result);
          if(result !== null){
            console.log("Inserto el registro");
          }
          else{
            console.log("Salio error");
          }
        },
        error:(err) => {
          console.log("Salio error"+ err);
        }
      }
    )
  }

  getInputProduct(productForm : ProductModel){
    let inputProduct: ProductModel = {
      idproducto: productForm.idproducto,
      idcategoria: productForm.idcategoria,
      codigo :productForm.codigo,
      nombre :productForm.nombre,
      precioVenta: productForm.precioVenta,
      stock: productForm.stock,
      descripcion: productForm.descripcion,
      imagen: '',
      estado: productForm.estado
    }

    return inputProduct;
  }

  onCancelClick(): void {
    this.onNoClick.emit();
  }

  public SaveProduct() {
    if(this.productForm.idproducto > 0){
      this.UpdateProduct();
    }
    else{
      this.InsertProduct();
    }
  }

  onSubmit(formProduct : NgForm) {
    if(formProduct.valid){
      this.SaveProduct();
    }
  }

  public getCategory() {
    this.categorySource = [];
    this.serviceCategory.GetListCategory()
    .subscribe(
      {
        next: (result : any) => {
          console.log("Resultado :", result);
          if(result.responseMessage == "Ok"){
            this.categorySource = result.resultData;
          }
          else{
            console.log("Salio error");
            return;
          }
        },
        error:(err) => {
          console.log("Salio error"+ err);
          return;
        }
      }
    )
  }

}
