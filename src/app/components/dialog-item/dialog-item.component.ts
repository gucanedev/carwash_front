import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogService } from '../../models/commun';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-item',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatIconModule],
  templateUrl: './dialog-item.component.html',
  styleUrl: './dialog-item.component.css'
})
export class DialogItemComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogService,
  ) { }

  cambio: number = 0;
  cantidad: number = 1;
  messageError: string = '';
  onNoClick(): void {
    // this.messageError = ''
    // if (this.cambio >= 0 && this.data.animal != 0) {
    //   this.dialogRef.close(this.data.name);
    //   // console.log('es valido')
    // } else {
    //   this.messageError = 'Dato incorrecto'
    // }

  }

  modelChangeFn(value: number) {
    // this.messageError = ''
    this.cambio = value - this.data.costo;
    if (this.cambio < 0) {
      this.messageError = 'Operacion no valida'
    }
  }

}
