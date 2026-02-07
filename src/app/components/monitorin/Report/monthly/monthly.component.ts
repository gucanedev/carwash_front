import { Component, Input, input } from '@angular/core';
import { ISalesMonthly } from '../../../../models/carwashers';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [DatePipe, CurrencyPipe,MatFormFieldModule, FormsModule, ReactiveFormsModule, MatTableModule],
  templateUrl: './monthly.component.html',
  styleUrl: './monthly.component.css'
})
export class MonthlyComponent {
  @Input() monthlysales!: ISalesMonthly[];

   displayedColumns: string[] = ['name', 'cantidad', 'total'];

  getTotalRegistre() {
    return this.monthlysales.map(t => t.registros).reduce((acc, value) => acc + value, 0);

  }
   getTotal() {
    return this.monthlysales.map(t => t.total).reduce((acc, value) => acc + value, 0);

  }
}
