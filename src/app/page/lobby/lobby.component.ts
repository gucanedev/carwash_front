import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitlistComponent } from '../../components/waitlist/waitlist.component';
import { IWaitinList } from '../../models/Sales';
import { SaleService } from '../../service/sale.service';
import { NotificacionsnackbarService } from '../../service/notificacionsnackbar.service';
import { ResponseGeneric } from '../../models/commun';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule, WaitlistComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent implements OnInit {
  constructor(
    private _notif: NotificacionsnackbarService,
    private _saleService: SaleService) {

  }

  listaEspera: IWaitinList[] = [
    { id: 1, nombreCliente: 'NombreCliente', nombreServicio: 'Nombre carro', etapaDesc: 'Etapa desc', tiempoTranscurrido: '0' },
  ]

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

  // listaEspera: IWaitinList[] = [
  //   { id: 1, nombreCliente: 'Gustavo Carreño Nevarez', NombreServicio: 'Honda civi', EtapaDesc: 'En espera', TiempoTranscurrido: '20' },
  //   { id: 2, nombreCliente: 'Cristopher Carreño Cabrera', NombreServicio: 'Ford Lobo', EtapaDesc: 'Aspirando', TiempoTranscurrido: '25' },
  //   { id: 3, nombreCliente: 'Besino de luis', NombreServicio: 'Nissan blanca', EtapaDesc: 'Secado', TiempoTranscurrido: '25' }
  // ]

}
