import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { ISaleDetailsResumen } from '../../../../models/Sales';
import { SaleService } from '../../../../service/sale.service';
import { NotificacionsnackbarService } from '../../../../service/notificacionsnackbar.service';
import { ResponseGeneric } from '../../../../models/commun';
import { ICarWhashers, ICarWhashersDetails } from '../../../../models/carwashers';

@Component({
  selector: 'app-carwasheritem',
  standalone: true,
 providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe,MatTableModule
    ,DatePipe,CurrencyPipe
  ],
  templateUrl: './carwasheritem.component.html',
  styleUrl: './carwasheritem.component.css'
})
export class CarwasheritemComponent implements OnInit {

    constructor(private _salesSevice: SaleService,
      private _notif: NotificacionsnackbarService) {
  
    }
  ngOnInit(): void {
    this.getSaleEmploye();
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  employeNameCurren:string='';
  total: number = 0;
  totalDetails: number = 0;
    displayedColumns: string[] = ['name','cantidad', 'total'];
    displayedColumnsDetails: string[] = ['Description','CreateDate', 'Price'];
  itemSale: ICarWhashers[] = [];
itemSaleDetails: ICarWhashersDetails[] = [];

  getSaleEmploye() {
  
      const saleEmploue = this._salesSevice.getCarWashers()
        .subscribe({
          next: (response: ResponseGeneric) => {
            if (response.isSuccess) {
              // console.log(response.result,'agrupado');

              this.itemSale = response.result;
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

    getSaleByEmployeId(id:number) {
  
      const saleDetails = this._salesSevice.getCarWashersSales(id)
        .subscribe({
          next: (response: ResponseGeneric) => {
            if (response.isSuccess) {
              // console.log(response.result,'Detalle');

              this.itemSaleDetails = response.result;
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

  selectedRow(row: any) {
    // console.log(row)
    
    this.getSaleByEmployeId(row.carWasherId);
    this.employeNameCurren=row.name;
  }
  
  getTotalCar(){
     return this.itemSale.map(t => t.cantidad).reduce((acc, value) => acc + value, 0);
   
  }
 getTotalPrice() {
    this.totalDetails = this.itemSaleDetails.map(t => t.price).reduce((acc, value) => acc + value, 0);
    // this.timepoServicioValue = this.totalTiempo;
    return this.totalDetails
  }
  getTotal() {
    this.total = this.itemSale.map(t => t.total).reduce((acc, value) => acc + value, 0);
    // this.timepoServicioValue = this.totalTiempo;
    return this.total
  }
}
