import { Component, OnInit } from '@angular/core';
import { itemMonitorinSales } from '../../../../models/monitoringSales';
import { CarwasheritemComponent } from '../../../../components/monitorin/Report/carwasheritem/carwasheritem.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, formatDate } from '@angular/common';
import { SaleService } from '../../../../service/sale.service';
import { NotificacionsnackbarService } from '../../../../service/notificacionsnackbar.service';
import { ResponseGeneric } from '../../../../models/commun';
import { ICarWhashers, ICarWhashersDetails, ISalesMonthly } from '../../../../models/carwashers';
import { MonthlyComponent } from '../../../../components/monitorin/Report/monthly/monthly.component';


interface Food {
  value: string;
  viewValue: string;
}

interface LastYear {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-car-washer',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule,MatInputModule,MatButtonModule,MatSelectModule
    ,CarwasheritemComponent,MonthlyComponent,CommonModule],
  templateUrl: './car-washer.component.html',
  styleUrl: './car-washer.component.css'
})
export class CarWasherComponent implements OnInit {


   constructor(private _salesSevice: SaleService,
      private _notif: NotificacionsnackbarService) {
  
    }


  ngOnInit(): void {
     this.fechaSeleccionada =  new Date();
     this.years= this.obtenerUltimos5Anios();
     
    
      this.getSaleEmploye(formatDate(this.fechaSeleccionada,'dd/MM/yyyy','es-MX'));
      
   }

   foods: Food[] = [
    {value: '1', viewValue: 'Reporte por empleado'},
    {value: '2', viewValue: 'Reporte Mensual'},
    {value: '3', viewValue: 'Reporte Rango de fechas'},
  ];
  years:LastYear[]=[];
  monthlysales:ISalesMonthly[]=[];

  fechaSeleccionada!: Date;
  selectedyear: number = new Date().getFullYear();
  selectedValue: string = '1';

  listaCard: itemMonitorinSales[] = [
    { title: "Registradas", value: "$550", leyenda: "Hoy",iconName:"request_quote",color:"red" }
  
  ]

   itemSale: ICarWhashers[] = [];
    itemSaleDetails: ICarWhashersDetails[] = [];

  
  obtenerUltimos5Anios() {
    const anioActual = new Date().getFullYear();
      return Array.from({length:5},(_,i)=>{
       const anio = anioActual-i;
       return{
        value:anio,
        viewValue:anio
       }
    })
    
  }




  Search() {
    
    switch (this.selectedValue) {
    case '1':
      console.log('Año 1 seleccionado');
      
    const fechaFormateada = formatDate(this.fechaSeleccionada, 'dd/MM/yyyy', 'es-MX');
    this.getSaleEmploye(fechaFormateada);
      break;
    case '2':
      console.log('Año 2 seleccionado');
      this.getMonthlySales(this.selectedyear);
      break;
    default:
      console.log('Otro año');
  }

  }
 


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


getMonthlySales(year:number) {

    const saleEmploue = this._salesSevice.getMonthlySales(year)
      .subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            // console.log(response.result,'agrupado');

            this.monthlysales = response.result;
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
}
