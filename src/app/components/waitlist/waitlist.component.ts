import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { IWaitinList } from '../../models/Sales';

import { Subscription, interval, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-waitlist',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.css'
})
export class WaitlistComponent implements OnInit, OnDestroy {

  @Input() trabajo: IWaitinList = { id: 0, etapaDesc: '', nombreCliente: '', nombreServicio: '', tiempoTranscurrido: '20', fechaCreo: '2021-09-01 21:56:34.8600000' };


  constructor(private _router: Router) {
    // this.timers[this.trabajo.id] = timer(0, 1000);
  }

  private subscription: Subscription = new Subscription();
  // subscriptions: { [key: number]: Subscription } = {}
  // timers: { [key: number]: Observable<number> } = {}

  timeDifference: any;
  dDay = new Date();
  secondsToDday: any;
  minutesToDday: any;
  hoursToDday: any;
  daysToDday: any;
  milliSecondsInASecond = 1000;
  SecondsInAMinute = 60;
  minutesInAnHour = 60;
  hoursInADay = 24;
  fecharMostrar: string = ''
  ngOnInit(): void {
    this.getTimerWork2(this.trabajo.fechaCreo);

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());

  }

  getTimerWork2(fecha: string) {
    this.subscription = interval(1000).subscribe(x => {
      this.getTimeDifference(fecha);
      this.fecharMostrar = this.hoursToDday + ':' + this.minutesToDday + ':' + this.secondsToDday;

    });

  }


  getTimerWork(fecha: string) {
    this.subscription = interval(1000).subscribe(x => {
      this.getTimeDifference(fecha);
      this.fecharMostrar = this.hoursToDday + ':' + this.minutesToDday + ':' + this.secondsToDday;
      // if (this.hoursToDday = '0') {
      //   this.fecharMostrar = this.minutesToDday + ':' + this.secondsToDday;
      // } else {
      //   this.fecharMostrar = this.hoursToDday + ':' + this.minutesToDday + ':' + this.secondsToDday;
      // }
    });
    return this.fecharMostrar;
    console.log('entros a la fncion')
  }


  private getTimeDifference(fecha: string) {
    this.dDay = new Date(fecha);
    this.timeDifference = new Date().getTime() - this.dDay.getTime();
    this.allocateTimeUnits(this.timeDifference);

  }
  private allocateTimeUnits(timeDifference: any) {

    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));

  }


  // newSales() {
  //   console.log('new sales');
  //   this._router.navigate(['newsale'])
  // }

  showWorkDetails(id: number): void {

    this._router.navigate(['details/' + id])
  }

}
