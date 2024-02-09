import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';



export interface DialogData {
  animal: string;
  name: number;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  cambio: number = 0;

  calcularCambio(pagoCliente: number) {
    this.cambio = pagoCliente - this.data.name;
    console.log(this.cambio);
  }
  onNoClick(totalPay: number): void {
    this.dialogRef.close(totalPay);
  }
  modelChangeFn(value: number) {
    this.cambio = value - this.data.name;
  }


}
