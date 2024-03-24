import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { itemStage } from '../../models/catServicio';
import { SaleService } from '../../service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsnackComponent } from '../../components/common/alertsnack/alertsnack.component';

import { Subscription, interval, Observable, timer } from 'rxjs';
import { IWaitinList } from '../../models/Sales';
import { SearchcustomerComponent } from '../../components/searchcustomer/searchcustomer.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule, AlertsnackComponent, SearchcustomerComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private _saleService: SaleService,
    private _routeActice: ActivatedRoute,
    private _route: Router) {

  }
  ngOnInit(): void {
    console.log('sadsad');
  }




}
