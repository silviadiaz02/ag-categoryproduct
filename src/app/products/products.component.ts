import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../modal/modal.component';
import { ModalType } from '../models/Enums/modalType';
import { ModalData } from '../models/modalData';
import { ProductModel } from '../models/productModel';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title = 'Producto';
  displayedColumns: string[] = ['idProducto','codigo','nombre','precioVenta','stock','descripcion','estado', 'actions'];
  productDataSource! : ProductModel[];
  dataSource! : MatTableDataSource<ProductModel>;

  constructor(
    public modal: MatDialog,
    private serviceProduct: ProductService
    ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  clickedRows = new Set<ProductModel>();
  ngOnInit(): void {
    this.getProduct();
  }

  setPaginator() {
    console.log('dataSource',this.dataSource);
    console.log('productDataSource',this.productDataSource);
   // this.dataSource.paginator = this.paginator;
  }

  showProduct(idProduct: number): void {
    let product = this.getProductId(idProduct);
    let newProduct: ModalData = {
      hasCancelButton: false,
      buttonTitle: 'Aceptar',
      title: this.title,
      modalType: ModalType.Product,
      response: false,
      message: '',
      object: product,
      isDisabled: true
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: newProduct,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createProduct(): void {
    let newCategory: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Guardar',
      title: this.title,
      modalType: ModalType.Product,
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

  modifyProduct(idProduct: number): void {
    let product = this.getProductId(idProduct);
    let modifyProduct: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Modificar',
      title: this.title,
      modalType: ModalType.Product,
      response: false,
      message: '',
      object: product,
      isDisabled: false
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: modifyProduct,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteProduct(idProduct: number): void {
    let product = this.getProductId(idProduct);
    let deleteCategory: ModalData = {
      hasCancelButton: true,
      buttonTitle: 'Aceptar',
      title: this.title,
      modalType: ModalType.Question,
      response: false,
      message: '',
      object: product,
      isDisabled: false
    }

    const dialogRef = this.modal.open(ModalComponent, {
      data: deleteCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getProductId(idProduct : number) : ProductModel {
    let product = this.productDataSource.filter(c => c.idproducto == idProduct);
    return product[0];
  }

  public getProduct() {
    this.productDataSource = [];
    this.serviceProduct.GetListProduct()
    .subscribe(
      {
        next: (result : any) => {
          console.log("Resultado :", result);
          if(result.responseMessage == "Ok"){
            this.productDataSource = result.resultData;
            this.dataSource = new MatTableDataSource<ProductModel>(this.productDataSource);
            this.setPaginator();
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

}