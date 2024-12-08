import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { ISaleDetailsResumen, paySale } from '../../models/Sales';
import { SaleService } from '../../service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseGeneric } from '../../models/commun';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NotificacionsnackbarService } from '../../service/notificacionsnackbar.service';

@Component({
  selector: 'app-cresumen-sale',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatTableModule, MatButtonModule],
  templateUrl: './cresumen-sale.component.html',
  styleUrl: './cresumen-sale.component.css'
})
export class CresumenSaleComponent implements OnInit {
  constructor(private _salesSevice: SaleService,
    private _routeActice: ActivatedRoute,
    private _route: Router,
    private _notif: NotificacionsnackbarService) {

  }
  displayedColumns: string[] = ['cliente', 'precio'];
  idService: number = 0;
  total: number = 0;
  nombreCliente: string = '';
  nombreBien: string = '';
  estatudId: number = 1;
  itemSale: ISaleDetailsResumen[] = [];

  ngOnInit(): void {
    this.idService = parseInt(this._routeActice.snapshot.paramMap.get('id')!);
    if (this.idService > 0)
      this.getSaleDetailById(this.idService);
  }
  getTotal() {
    this.total = this.itemSale.map(t => t.precio).reduce((acc, value) => acc + value, 0);
    // this.timepoServicioValue = this.totalTiempo;
    return this.total
  }

  selectedRow(row: any) {
    console.log(row);

  }

  getSaleDetailById(idP: number) {

    const saleDetails = this._salesSevice.getDetailsSaleById(idP)
      .subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            // console.log(response.result);
            this.nombreCliente = response.result.cliente;
            this.nombreBien = response.result.bien;
            this.estatudId = response.result.estatudId;
            this.itemSale = response.result.servicios;
          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          // this.isLoad = false;
          // this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
          // this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });


  }

  regresar() {
    this._route.navigate(['/paySale']);
  }
  paySale() {
    let entity = new paySale(this.idService);

    const save = this._salesSevice.paySale(entity).subscribe({
      next: (response: ResponseGeneric) => {
        if (response.isSuccess) {
          this._route.navigate(['/paySale']);
          this._notif.openSnackBar(response.message, 'OK', 5)


        }
        else {
          this._notif.openSnackBar(response.message, 'OK', 5)
        }

      },
      error: (er: any) => {
        this._notif.openSnackBar('Error al guardar la venta', 'OK', 5)
      }
    });


  }
}
