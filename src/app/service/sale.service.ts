import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatABS, CatService, CatServiceSale, EtapaServicio } from '../models/catServicio';
import { paySale, Venta } from '../models/Sales';
import { ResponseGeneric } from '../models/commun';
import { Observable } from 'rxjs';
import { etapaSave } from '../models/workflow';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private readonly http: HttpClient) { }

  rutaApi: string =  `${environment.apiUrl}/Venta`;  
  

  getAllService() {

    return this.http.get<CatService>(`${this.rutaApi}/servicios?option=1`);
  }
  getAllServiceSale() {

    return this.http.get<CatServiceSale>(`${this.rutaApi}/servicios?option=2`);
  }

getAllEmployes() {

    return this.http.get<ResponseGeneric>(`${this.rutaApi}/employe`);
  }

  saveSale(entity: Venta) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}`, entity);
  }
  save(entity: any) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}`, entity);
  }
  getServiceById(id: number) {
    return this.http.get<CatABS>(`${this.rutaApi}/servicio/id?id=${id}`);
  }
  saveCatService(entity: EtapaServicio) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}/servicio`, entity);
  }

  getWaitinList() {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/waitinglist`);
  }

  getworkflow(id: number): Observable<ResponseGeneric> {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/workflow?id=${id}`);
  }

  saveWorkflow(workflow: etapaSave[]): Observable<ResponseGeneric> {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}/workflow`, workflow);
  }

  getPendingSale() {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/pysale`);
  }
  getDetailsSaleById(saleId: number) {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/saledetail?ventaId=${saleId}`);
  }

  paySale(entity: paySale) {
    return this.http.post<ResponseGeneric>(`${this.rutaApi}/salepay`, entity);
  }

  getitemBoard() {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/board`);
  }
   getCarWashers(fecha:any) {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/carwasher?fecha=${fecha}`);
  }
  getCarWashersSales(id:number,fecha:string) {
    return this.http.get<ResponseGeneric>(`${this.rutaApi}/carwasher/sales?EmployeId=${id}&fecha=${fecha}`);
  }
}


