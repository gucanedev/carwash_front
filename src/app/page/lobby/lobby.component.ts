import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitlistComponent } from '../../components/waitlist/waitlist.component';
import { IWaitinList } from '../../models/Sales';
import { SaleService } from '../../service/sale.service';
import { NotificacionsnackbarService } from '../../service/notificacionsnackbar.service';
import { ResponseGeneric } from '../../models/commun';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, WaitlistComponent, MatIconModule, MatButtonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent implements OnInit {
  constructor(
    private _notif: NotificacionsnackbarService,
    private _saleService: SaleService,
    private _router: Router) {

  }

  listaEspera: IWaitinList[] = []

  ngOnInit(): void {
    this.getWaitinList();
  }

  getWaitinList2(): void {

    const loginreturn = this._saleService.getWaitinList()
      .subscribe({
        next: (response: ResponseGeneric) => {

          if (response.isSuccess) {
            this.listaEspera = response.result;
          }
          else {
            this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);
          }

        },
        error: (er: HttpErrorResponse) => {
          console.log(er)
          console.log(er.status)

          this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);
        }
      });

  }

  getWaitinList(): void {

    const loginreturn = this._saleService.getWaitinList()
      .subscribe((response: ResponseGeneric) => {
        if (response.isSuccess) {
          this.listaEspera = response.result;
        }
        else {
          this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);
        }
      });

  }


  newSales() {

    this._router.navigate(['newventa'])
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Handle 401 Unauthorized error
      console.error('Unauthorized access');
      // Redirect to login or show a message to the user
    }
    console.error('Something went wrong');
    // return throwError('Something went wrong');
  }

}
