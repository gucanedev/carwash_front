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

  getWaitinList(): void {

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
        error: (er: any) => {
          // this.isLoad = false;
          // this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
          this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);
        }
      });

  }

  newSales() {
    console.log('new sales');
    this._router.navigate(['newsale'])
  }

}
