import { Component } from '@angular/core';
import { itemMonitorinSales } from '../../../../models/monitoringSales';
import { CarwasheritemComponent } from '../../../../components/monitorin/Report/carwasheritem/carwasheritem.component';

@Component({
  selector: 'app-car-washer',
  standalone: true,
  imports: [CarwasheritemComponent],
  templateUrl: './car-washer.component.html',
  styleUrl: './car-washer.component.css'
})
export class CarWasherComponent {

  listaCard: itemMonitorinSales[] = [
    { title: "Registradas", value: "$550", leyenda: "Hoy",iconName:"request_quote",color:"red" }
  
  ]

}
