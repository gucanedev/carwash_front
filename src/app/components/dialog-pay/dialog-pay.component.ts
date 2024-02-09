import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';


export interface DialogData {
  animal: number;
  name: number;
  cancelar: string;
}

@Component({
  selector: 'app-dialog-pay',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './dialog-pay.component.html',
  styleUrl: './dialog-pay.component.css'
})
export class DialogPayComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogPayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  messageError: string = '';

  cambio: number = 0;

  calcularCambio(pagoCliente: number) {
    this.cambio = pagoCliente - this.data.name;
    console.log(this.cambio);
  }
  onNoClick(): void {
    this.messageError = ''
    if (this.cambio >= 0 && this.data.animal != 0) {
      this.dialogRef.close(this.data.name);
      // console.log('es valido')
    } else {
      this.messageError = 'Dato incorrecto'
    }

  }


  modelChangeFn(value: number) {
    this.messageError = ''
    this.cambio = value - this.data.name;
    if (this.cambio < 0) {
      this.messageError = 'Operacion no valida'
    }
  }

}
