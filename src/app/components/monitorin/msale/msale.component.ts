import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { itemMonitorinSales } from '../../../models/monitoringSales';


@Component({
  selector: 'app-msale',
  standalone: true,
  imports: [CommonModule, MsaleComponent, MatIconModule],
  templateUrl: './msale.component.html',
  styleUrl: './msale.component.css'
})


export class MsaleComponent {
  @Input() itemMonitor: itemMonitorinSales = { title: '', value: "", leyenda: "" };

}
