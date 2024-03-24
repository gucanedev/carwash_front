import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchcustomerComponent } from '../../components/searchcustomer/searchcustomer.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, of, startWith } from 'rxjs';
import { SaleService } from '../../service/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionsnackbarService } from '../../service/notificacionsnackbar.service';
import { CatServiceSale, CatServicioH } from '../../models/catServicio';
import { carritoCompra } from '../../models/Sales';
import { ResponseGeneric } from '../../models/commun';
import { Router } from '@angular/router';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-newventa',
  standalone: true,
  imports: [CommonModule, SearchcustomerComponent, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, FormsModule, MatButtonModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './newventa.component.html',
  styleUrl: './newventa.component.css'
})
export class NewventaComponent implements OnInit {

  constructor(private fb: FormBuilder, private _saleSerice: SaleService,
    private _snackBar: NotificacionsnackbarService, private _router: Router) { }

  serviceList: CatServicioH[] = [{ id: 1, descripcion: "No hay registros", precio: 0, tiempoEstimado: 0, tiempoEstGeneral: 0 }];
  listCarrito: carritoCompra[] = [];
  carritoFound: carritoCompra = { id: 1, cantidad: 1, descripcion: '', precio: 1 }
  servicioFound: CatServicioH | undefined;
  // stateGroupOptions!: Observable<StateGroup[]>;
  stateGroupOptions!: Observable<CatServicioH[]>;

  salesForm = this.fb.group({
    client: [''],
    description: [''],
    service: [],
    package: [],
    telephone: []
  });


  ngOnInit(): void {

    this.getServicesBD();

  }

  getServicesBD() {

    const loginreturn = this._saleSerice.getAllServiceSale()
      .subscribe({
        next: (response: CatServiceSale) => {
          if (response.isSuccess) {
            // console.log(response.result);
            // this.tiempoEstimado = response.result.tiempoEstGeneral;
            // this.getElapseTime(this.tiempoEstimado);
            // this.VehiclesFront = response.result.vehiculosDelante + ' Vehículos por delante';
            this.serviceList = response.result.servicios;
            this.stateGroupOptions = this.salesForm.get('service')!.valueChanges.pipe(
              startWith(''),
              map(value => this._filterService(value || '')),
            );

          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          this._snackBar.openSnackBar("Ocurrio un error al consultar los servicios", "Ok", 5)
          //  this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });
  }

  agregar() {
    if (this.salesForm.valid) {
      let idService = this.salesForm.get('service')?.value!
      this.servicioFound = this.serviceList.find(elem => elem.id == idService);

      if (this.servicioFound !== undefined) {
        if (this.carritoFound !== undefined) {
          this.listCarrito.push({ id: this.servicioFound!.id, cantidad: 1, descripcion: this.servicioFound!.descripcion, precio: this.servicioFound!.precio });
        }
      }
    }


  }

  save() {
    if (this.salesForm.valid) {
      let tel: string = this.salesForm.get('telephone')?.value!

      let result = { ...this.salesForm.value, service: this.listCarrito, telephone: tel.toString() }


      const save = this._saleSerice.save(result).subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            this._snackBar.openSnackBar('Guardado Correctamente', 'OK', 5)
            this._router.navigate(['/lobby']);
            // console.log('Se guardo correctamente')

          }
          else {
            this._snackBar.openSnackBar('Error al guardar', 'OK', 5)


          }

        },
        error: (er: any) => {
          this._snackBar.openSnackBar('Error al guardar la venta', 'OK', 5)

        }
      });


    }


  }

  updateCarrito($event: carritoCompra[]) {
    this.listCarrito = $event;
  }

  regresa() {
    this._router.navigate(['/lobby'])
  }

  private _filterService(value: string): CatServicioH[] {
    if (value) {

      const filterValue = value.toString().toLowerCase();

      return this.serviceList.filter(state => state.descripcion.toLowerCase().includes(filterValue));

    }
    return this.serviceList;

  }




}


