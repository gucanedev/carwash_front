import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionsnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, dura: number) {
    this._snackBar.open(message, action, { duration: dura * 1000 });
  }



}
