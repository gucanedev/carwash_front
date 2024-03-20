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

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule, AlertsnackComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit, OnDestroy {


  constructor(private fb: FormBuilder,
    private _saleService: SaleService,
    private _routeActice: ActivatedRoute,
    private _route: Router) {
    this.trabajo.forEach(elemen => {
      this.timers[elemen.id] = timer(0, 1000);
    });
  }


  trabajo: IWaitinList[] = [{ id: 1, etapaDesc: 'descEtapa', nombreCliente: 'Gustavo', nombreServicio: 'Honda', tiempoTranscurrido: '20', fechaCreo: '2021-09-01 21:56:34.8600000' },
  { id: 2, etapaDesc: 'descetapa2', nombreCliente: 'Cristopher', nombreServicio: 'Toyota', tiempoTranscurrido: '2', fechaCreo: '2024-03-01 19:56:08.5133333' }];

  timers: { [key: number]: Observable<number> } = {}; // Objeto para almacenar los contadores de tiempo
  subscriptions: { [key: number]: Subscription } = {};
  tiempot: number = 0

  descripcionValue: string = ''
  precioValue: Number = 0;
  idService: number = 0;
  checked = false;

  descripcionEtapaValue: string = '';
  tiempoEtapaValue: string = '';
  totalTiempo: number = 0;
  // itemTiempo: itemStage[] = [{ desc: 'Aspirado', timer: 50 }];
  itemTiempo: itemStage[] = [];
  displayedColumns: string[] = ['descripcion', 'tiempoMinutos'];

  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  haveStep = new FormControl('', [Validators.required]);
  precioetapa = new FormControl('');
  descripcionetapa = new FormControl('');
  serviceform = this.fb.group({
    descripcion: [''],
    precio: [''],
    haveStep: [false],
    precioetapa: [''],
    descripcionetapa: ['']
  });


  timeDifference: any;
  dDay = new Date('Feb 24 2024 20:01:00');
  secondsToDday: any;
  minutesToDday: any;
  hoursToDday: any;
  daysToDday: any;
  milliSecondsInASecond = 1000;
  SecondsInAMinute = 60;
  minutesInAnHour = 60;
  hoursInADay = 24;

  ngOnInit(): void {

    console.log('inicie')
  }
  ngOnDestroy() {

    Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
  }

  startTimer(element: number) {
    this.subscriptions[element] = this.timers[element].subscribe(val => {
      // console.log(`Tiempo transcurrido para ${element}: ${val} segundos`);
      return val;
    });
  }

  stopTimer(element: number) {
    if (this.subscriptions[element]) {
      this.subscriptions[element].unsubscribe();
      console.log(`Contador de tiempo para ${element} detenido`);
    }
  }

  // private getTimeDifference() {
  //   this.timeDifference = new Date().getTime() - this.dDay.getTime();
  //   this.allocateTimeUnits(this.timeDifference);

  // }
  // private allocateTimeUnits(timeDifference: any) {

  //   this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
  //   this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  //   this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
  //   this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));

  // }

  test() {
    console.log('asdasd')
      ;
  }

  getServicesById(idP: number) {

  }


  getErrorDesc() {
    if (this.descripcion.hasError('required')) {
      return 'El campo es requerido ';
    }
    else return '';
  }
  getErrorPrecio() {
    if (this.precio.hasError('required')) {
      return 'El campo es requerido ';
    }
    else return '';
  }
  getErrorEtapaDesc() {
    return 'El campo es requerido ';
  }

  getErrorEtapaPrecio() {
    return 'El campo es requerido ';
  }

  getEstimateTimer() {

    this.totalTiempo = this.itemTiempo.map(t => t.tiempoMinutos).reduce((acc, value) => acc + value, 0);
    return this.totalTiempo
  }

  addStage() {



  }

  async save() {




  }

  async update() {


  }


}
