import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { IWaitinList } from '../../models/Sales';


@Component({
  selector: 'app-waitlist',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './waitlist.component.html',
  styleUrl: './waitlist.component.css'
})
export class WaitlistComponent implements OnInit {

  @Input() trabajo: IWaitinList = { id: 0, etapaDesc: '', nombreCliente: '', nombreServicio: '', tiempoTranscurrido: '20' };

  constructor(private _router: Router) {

  }
  ngOnInit(): void {

  }


  newSales() {
    console.log('new sales');
    this._router.navigate(['newsale'])
  }
}
