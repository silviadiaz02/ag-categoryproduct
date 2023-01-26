import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalType } from '../models/Enums/modalType';
import { ModalData } from '../models/modalData';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  isProduct = false;
  isCategory = false;
  isQuestion = false;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}

  ngOnInit(): void {
    this.isProduct = this.data.modalType == ModalType.Product;
    this.isCategory = this.data.modalType == ModalType.Category;
    this.isQuestion = this.data.modalType == ModalType.Question;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}