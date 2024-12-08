import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpaySaleComponent } from '../../components/cpay-sale/cpay-sale.component';
import { CresumenSaleComponent } from '../../components/cresumen-sale/cresumen-sale.component';

@Component({
  selector: 'app-pay-sale',
  standalone: true,
  imports: [CommonModule, CpaySaleComponent, CresumenSaleComponent],
  templateUrl: './pay-sale.component.html',
  styleUrl: './pay-sale.component.css'
})
export class PaySaleComponent {

}
