import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../models/modalData';
import { ModalType } from '../models/Enums/modalType';
import { CategoryModel } from '../models/categoryModel';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  title = 'Categoria';
  displayedColumns: string[] = ['idcategoria', 'nombre', 'descripcion', 'estado', 'actions'];
  categoryDataSource! : CategoryModel[];
  dataSource : any;
  constructor(
    public modal: MatDialog,
    private serviceCategory: CategoryService
    ) {
      this.categoryDataSource = [];
     }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getCategory();
  }

  setPaginator() {
    console.log('dataSource',this.dataSource);
    console.log('categoryDataSource' ,this.categoryDataSource);
  //  this.dataSource.paginator = this.paginator;
  }

  showCategory(idCategoria: number): void {
    let category = this.getCategoryId(idCategoria);
    let newCategory: ModalData = {
      hasCancelButton: false,
      buttonTitle: 'Aceptar',
      title: this.title,
      modalType: ModalType.Category,
      response: false,
      message: '',
      object: category,
      isDisabled: true
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: newCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createCategory(): void {
    let newCategory: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Guardar',
      title: this.title,
      modalType: ModalType.Category,
      response: false,
      message: '',
      object: null,
      isDisabled: false
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: newCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  modifyCategory(idCategoria: number): void {
    let category = this.getCategoryId(idCategoria);
    let modifyCategory: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Modificar',
      title: this.title,
      modalType: ModalType.Category,
      response: false,
      message: '',
      object: category,
      isDisabled: false
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: modifyCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteCategory(idCategoria: number): void {
    let category = this.getCategoryId(idCategoria);
    let deleteCategory: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Aceptar',
      title: this.title,
      modalType: ModalType.Question,
      response: false,
      message: '',
      object: category,
      isDisabled: false
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: deleteCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getCategoryId(idCategoria : number) : CategoryModel {
    let category = this.categoryDataSource.filter(c => c.idcategoria == idCategoria);
    return category[0];
  }

  public getCategory() {
    this.categoryDataSource = [];
    this.serviceCategory.GetListCategory()
    .subscribe(
      {
        next: (result : any) => {
          console.log("Resultado :", result);
          if(result.responseMessage == "Ok"){
            this.categoryDataSource = result.resultData;
            this.dataSource = new MatTableDataSource<CategoryModel>(this.categoryDataSource);
            this.dataSource.paginator = this.paginator;
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