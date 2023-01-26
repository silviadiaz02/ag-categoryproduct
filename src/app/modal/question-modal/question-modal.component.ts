import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryModel } from 'src/app/models/categoryModel';
import { ModalData } from 'src/app/models/modalData';
import { ProductModel } from 'src/app/models/productModel';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent {
  @Input() questionModel!: ModalData;
  @Output() onNoClick = new EventEmitter();

  constructor(
    private serviceProduct: ProductService,
    private serviceCategory: CategoryService
  ) { }

  onCancelClick(): void {
    this.onNoClick.emit();
  }

  DeleteProduct() {
    let product = this.questionModel.object as ProductModel;
    this.serviceProduct.DeleteProduct(product.idproducto)
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

  DeleteCategory() {
    let category = this.questionModel.object as CategoryModel;
    this.serviceCategory.DeleteCategory(category.idcategoria)
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

  onDelete() {
    if(this.questionModel.object?.hasOwnProperty('idproducto')){
      this.DeleteProduct();
    }
    else{
      this.DeleteCategory();
    }
  }
}
