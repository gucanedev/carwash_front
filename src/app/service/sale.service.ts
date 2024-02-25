import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatABS, CatService, CatServiceSale, EtapaServicio } from '../models/catServicio';
import { Venta } from '../models/Sales';
import { ResponseGeneric } from '../models/commun';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private readonly http: HttpClient) { }

  rutaApi: string = 'https://localhost:7052/api';

  getAllService() {

    return this.http.get<CatService>(`${this.rutaApi}/Venta/servicios?option=1`);
  }
  getAllServiceSale() {

    return this.http.get<CatServiceSale>(`${this.rutaApi}/Venta/servicios?option=2`);
  }



  saveSale(entity: Venta) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}/Venta`, entity);
  }
  getServiceById(id: number) {
    return this.http.get<CatABS>(`${this.rutaApi}/Venta/servicio/id?id=${id}`);
  }
  saveCatService(entity: EtapaServicio) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}/Venta/servicio`, entity);
  }

  getWaitinList() {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/Venta/waitinglist`);
  }


}


