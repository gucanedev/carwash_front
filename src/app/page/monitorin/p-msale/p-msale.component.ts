import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsaleComponent } from '../../../components/monitorin/msale/msale.component';
import { itemMonitorinSales } from '../../../models/monitoringSales';
import { Chart, registerables, Colors } from 'chart.js';
import { SaleService } from '../../../service/sale.service';
import { ResponseGeneric } from '../../../models/commun';



@Component({
  selector: 'app-p-msale',
  standalone: true,
  imports: [CommonModule, MsaleComponent],
  templateUrl: './p-msale.component.html',
  styleUrl: './p-msale.component.css'
})
export class PMsaleComponent implements OnInit {

  data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  constructor(private _SaleService: SaleService) {
    Chart.register(...registerables, Colors);
    // Chart.register(Colors);
  }
  // listaMonitoring: itemMonitorinSales[] = [{ title: "Registradas", value: "$550", leyenda: "Hoy" },
  // { title: "Pagadas", value: "$450", leyenda: "pagadas" },
  // { title: "En espera", value: "6", leyenda: "esperando.." },
  // { title: "Total", value: "25", leyenda: "Cancelados" }
  // ]
  listaMonitoring: itemMonitorinSales[] = []

  chart: any = []

  ngOnInit(): void {
    this.getBoard();
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: this.data,
    });

  }
  getBoard() {
    const loginreturn = this._SaleService.getitemBoard()
      .subscribe({
        next: (response: ResponseGeneric) => {
          console.log(response);
          if (response.isSuccess) {
            this.listaMonitoring = response.result;

          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          console.log('Error')
          // this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });
  }

}
