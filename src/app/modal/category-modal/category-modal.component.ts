import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/categoryModel';
import { ModalData } from 'src/app/models/modalData';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit{
  @Input() categoryModel!: ModalData;
  @Output() onNoClick = new EventEmitter();
  newCategory!: CategoryModel;
  isChecked = true;

  constructor(
    private serviceCategory: CategoryService
  ) { }
  
  ngOnInit(): void {
    if(this.categoryModel.object == null){
       this.newCategory = {
        idcategoria: 0,
        nombre: '',
        descripcion: '',
        estado: true,
      } 
    }
    else{
      this.newCategory = this.categoryModel.object as CategoryModel;
    }
  }

  public SaveCategory() {
    if(this.newCategory.idcategoria > 0){
      this.UpdateCategory();
    }
    else{
      this.InsertCategory();
    }
  }

  InsertCategory() {
    this.serviceCategory.InsertCategory(this.newCategory)
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

  UpdateCategory() {
    this.serviceCategory.UpdateCategory(this.newCategory)
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

  onCancelClick(): void {
    this.onNoClick.emit();
  }

  onSubmit(formCategory : NgForm) {
    if(formCategory.valid){
      this.SaveCategory();
    }
  }

}
