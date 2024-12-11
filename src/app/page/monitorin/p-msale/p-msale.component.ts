import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsaleComponent } from '../../../components/monitorin/msale/msale.component';
import { itemMonitorinSales } from '../../../models/monitoringSales';

@Component({
  selector: 'app-p-msale',
  standalone: true,
  imports: [CommonModule, MsaleComponent],
  templateUrl: './p-msale.component.html',
  styleUrl: './p-msale.component.css'
})
export class PMsaleComponent {
  listaMonitoring: itemMonitorinSales[] = [{ title: "Registradas", value: "550", leyenda: "Hoy" },
  { title: "Pagadas", value: "450", leyenda: "pagadas" },
  { title: "En espera", value: "6", leyenda: "esperando.." },
  { title: "Total", value: "25", leyenda: "registrados" }
  ]

}
