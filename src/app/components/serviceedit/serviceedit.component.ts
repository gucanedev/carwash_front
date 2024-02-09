import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatABS, CatService, CatServicioH } from '../../models/catServicio';
import { SaleService } from '../../service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@Component({
  selector: 'app-serviceedit',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './serviceedit.component.html',
  styleUrl: './serviceedit.component.css'
})
export class ServiceeditComponent implements OnInit {

  constructor(private fb: FormBuilder, private _saleService: SaleService,
    private _routeActice: ActivatedRoute,
    private _route: Router) { }

  descripcionValue: string = ''
  precioValue: Number = 0;
  idService: number = 0;
  checked = false;

  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  haveStep = new FormControl('', [Validators.required]);
  serviceform = this.fb.group({
    descripcion: [''],
    precio: [''],
    haveStep: [false]
  });

  ngOnInit(): void {
    this.idService = parseInt(this._routeActice.snapshot.paramMap.get('id')!);
    if (this.idService > 0)
      this.getServicesById(this.idService);
  }


  getServicesById(idP: number) {
    let CatServicioHija: CatServicioH[];
    const loginreturn = this._saleService.getServiceById(idP)
      .subscribe({
        next: (response: CatABS) => {
          if (response.isSuccess) {
            this.descripcionValue = response.result.descripcion;
            this.precioValue = response.result.precio;
          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          // this.isLoad = false;
          // this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
          // this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });
  }


  getErrorDesc() {
    if (this.descripcion.hasError('required')) {
      return 'El campo Descripcion es requerido ';
    }
    else return '';
  }
  getErrorPrecio() {
    if (this.precio.hasError('required')) {
      return 'El campo Precio es requerido ';
    }
    else return '';
  }

  async save() {

    if (this.serviceform.valid) {

      if (this.idService > 0) {
        console.log('Es una Modificacion')
      } else {
        console.log('Es un gardado nuevo')
      }

      // const maximo = await this.firbd.getMaxIdByCollection<CatServicio>('service');
      // if (maximo) {
      //   const idre = await maximo.subscribe(r => r.map(m => {
      //     this.idNext = m.id;

      //     this.serviceobj = {
      //       descripcion: this.serviceform.get('descripcion')?.value!,
      //       precio: parseFloat(this.serviceform.get('precio')?.value!),
      //       id: this.idNext += 1
      //     }
      //     console.log(this.serviceobj);
      //     this.firbd.createDoc(this.serviceobj, 'service');

      //     idre.unsubscribe();
      //     this._Route.navigate(['listservice'])
      //   }));


      // }

    }


  }

  async update() {
    console.log('regresar')
    this._route.navigate([`service`]);
    // if (this.serviceform.valid) {
    //   let objUpdate = {
    //     descripcion: this.serviceform.get('descripcion')?.value!,
    //     precio: parseFloat(this.serviceform.get('precio')?.value!),
    //   }
    //   const result = await this.firbd.updateCollation(objUpdate, 'service', this.documentoId);
    //   this._Route.navigate(['listservice'])

    // }

  }


}
