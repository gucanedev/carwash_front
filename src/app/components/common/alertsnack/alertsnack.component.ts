import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alertsnack',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './alertsnack.component.html',
  styleUrl: './alertsnack.component.css'
})
export class AlertsnackComponent {
  message: string = '';
  action: string = '';
  constructor(private _snackBar: MatSnackBar) { }

  openMessae() {
    this.openSnackBar('Mensaje de prueba', 'Accion')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }





}
