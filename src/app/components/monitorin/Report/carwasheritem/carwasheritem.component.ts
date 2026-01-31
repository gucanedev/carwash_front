import { CurrencyPipe, DatePipe, formatDate, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { ISaleDetailsResumen } from '../../../../models/Sales';
import { SaleService } from '../../../../service/sale.service';
import { NotificacionsnackbarService } from '../../../../service/notificacionsnackbar.service';
import { ResponseGeneric } from '../../../../models/commun';
import { ICarWhashers, ICarWhashersDetails } from '../../../../models/carwashers';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carwasheritem',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, MatTableModule
    , DatePipe, CurrencyPipe, MatInputModule,MatButtonModule
  ],
  templateUrl: './carwasheritem.component.html',
  styleUrl: './carwasheritem.component.css'
})
export class CarwasheritemComponent implements OnInit {

  constructor(private _salesSevice: SaleService,
    private _notif: NotificacionsnackbarService) {

  }
  ngOnInit(): void {
    this.fechaSeleccionada =  new Date();
    // this.getSaleEmploye(this.fechaSeleccionada);
     this.getSaleEmploye(formatDate(this.fechaSeleccionada,'dd/MM/yyyy','es-MX'));
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  fechaSeleccionada!: Date;

  employeNameCurren: string = '';
  total: number = 0;
  totalDetails: number = 0;
  displayedColumns: string[] = ['name', 'cantidad', 'total'];
  displayedColumnsDetails: string[] = ['Description', 'CreateDate', 'Price'];
  itemSale: ICarWhashers[] = [];
  itemSaleDetails: ICarWhashersDetails[] = [];

  getSaleEmploye(fecha:any) {

    const saleEmploue = this._salesSevice.getCarWashers(fecha)
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

  getSaleByEmployeId(id: number,fecha:string) {

    const saleDetails = this._salesSevice.getCarWashersSales(id,fecha)
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

  Search(){
    console.log(this.fechaSeleccionada,'Fecha Seleccionada')
    const fechaFormateada = formatDate(this.fechaSeleccionada,'dd/MM/yyyy','es-MX');

    console.log(fechaFormateada,'Fecha Seleccionadaform')
    this.getSaleEmploye(fechaFormateada);
  }
  selectedRow(row: any) {
    // console.log(row)
const fechaDetails=formatDate(this.fechaSeleccionada,'dd/MM/yyyy','es-MX')
    this.getSaleByEmployeId(row.carWasherId,fechaDetails);
    this.employeNameCurren = row.name;
  }

  getTotalCar() {
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
