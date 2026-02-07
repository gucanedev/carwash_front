import { CurrencyPipe, DatePipe, formatDate, JsonPipe } from '@angular/common';
import { Component, computed, Input, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

import { ResponseGeneric } from '../../../../models/commun';
import { ICarWhashers, ICarWhashersDetails } from '../../../../models/carwashers';
import { SaleService } from '../../../../service/sale.service';





@Component({
  selector: 'app-carwasheritem',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, JsonPipe, MatTableModule
    , DatePipe, CurrencyPipe
  ],
  templateUrl: './carwasheritem.component.html',
  styleUrl: './carwasheritem.component.css'
})

export class CarwasheritemComponent implements OnInit {
  @Input() itemSale!: ICarWhashers[];
  // itemSale = input<ICarWhashers[]>();
  fechaSeleccionada = input<Date>();

  constructor(private _salesSevice: SaleService) {

  }


  ngOnInit(): void {
    // this.fechaSeleccionada =  new Date();
    // this.years= this.obtenerUltimos5Anios();
    // console.log(this.years);
    // this.getSaleEmploye(this.fechaSeleccionada);
    //  this.getSaleEmploye(formatDate(this.fechaSeleccionada,'dd/MM/yyyy','es-MX'));
  }


  // foods: Food[] = [
  //   {value: '1', viewValue: 'Reporte por empleado'},
  //   {value: '2', viewValue: 'Reporte Mensual'},
  //   {value: '3', viewValue: 'Reporte Rango de fechas'},
  // ];
  // years:LastYear[]=[];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // selectedyear:string=  new Date().getFullYear().toString();
  //   selectedValue: string='1';

  employeNameCurren: string = '';
  total: number = 0;
  totalDetails: number = 0;
  displayedColumns: string[] = ['name', 'cantidad', 'total'];
  displayedColumnsDetails: string[] = ['Description', 'CreateDate', 'Price'];
  // itemSale: ICarWhashers[] = [];
  itemSaleDetails: ICarWhashersDetails[] = [];



  getSaleByEmployeId(id: number, fecha: string) {

    const saleDetails = this._salesSevice.getCarWashersSales(id, fecha)
      .subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            this.itemSaleDetails = response.result;
          }
          else {
            console.log('Error');
          }

        },
        error: (er: any) => {

        }
      });


  }

  fechaForm():string {
  
      const fecha = this.fechaSeleccionada();
      if (!fecha) return '';
else 
    return fecha.toString();
  }

  selectedRow(row: any) {
    // console.log(row)
 
    const fechaDetails = formatDate(this.fechaForm(),'dd/MM/yyyy','es-MX') ;
    // console.log(fechaDetails,'fecha llego')
    this.getSaleByEmployeId(row.carWasherId, fechaDetails);
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
