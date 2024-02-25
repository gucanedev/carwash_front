import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatABS, CatService, CatServicioH, EtapaServicio, itemStage } from '../../models/catServicio';
import { SaleService } from '../../service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { ResponseGeneric } from '../../models/commun';
import { max, timeout } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NotificacionsnackbarService } from '../../service/notificacionsnackbar.service';

@Component({
  selector: 'app-serviceedit',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './serviceedit.component.html',
  styleUrl: './serviceedit.component.css'
})
export class ServiceeditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private _saleService: SaleService,
    private _routeActice: ActivatedRoute,
    private _route: Router,
    private _notif: NotificacionsnackbarService
  ) { }

  btnAgregar: string = 'Agregar';
  visiblebtnnuevo: boolean = false

  descripcionValue: string = ''
  precioValue: Number = 0;
  timepoServicioValue: number = NaN;
  idService: number = 0;
  checked = false;
  etapaId: number = 0;

  descripcionEtapaValue: string = '';
  tiempoEtapaValue: string = '';
  totalTiempo: number = 0;
  itemTiempo: itemStage[] = [];
  displayedColumns: string[] = ['descripcion', 'tiempoMinutos'];
  disabledte: boolean = true;

  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  haveStep = new FormControl('', [Validators.required]);
  tiempoServicio = new FormControl('');
  precioetapa = new FormControl('');
  descripcionetapa = new FormControl('');
  serviceform = this.fb.group({
    descripcion: [''],
    precio: [''],
    tiempoServicio: [''],
    haveStep: [false],
    precioetapa: [''],
    descripcionetapa: ['']
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
            console.log(response.result);
            this.descripcionValue = response.result.descripcion;
            this.precioValue = response.result.precio;
            this.timepoServicioValue = response.result.tiempoEstimado;
            this.checked = response.result.tieneEtapas;
            this.itemTiempo = response.result.etapas;
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

  getErrorTiempoServicio() {
    let tiempo = parseInt(this.serviceform.get('tiempoServicio')?.value!);

    if (isNaN(tiempo) || tiempo === 0) {
      return 'El campo es requerido ';
    }
    else return '';
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
    this.timepoServicioValue = this.totalTiempo;
    return this.totalTiempo
  }

  addStage() {
    if (this.serviceform.valid) {
      let des = this.serviceform.get('descripcionetapa')?.value!
      let timer = this.serviceform.get('precioetapa')?.value!
      if ((des === '' || des === null) || (timer === '' || timer === null)) {
        this._notif.openSnackBar('Agregar una Descripcion y Tiempo Estimado', 'OK', 5)
        console.log('esta bacio')
      } else {
        // console.log(this.idService);
        // console.log(this.etapaId);
        // console.log(this.itemTiempo);
        if (this.etapaId <= 0) {
          let entityStage = new EtapaServicio();
          const MaxId = this.itemTiempo.reduce((max, etapa) => {
            return etapa.id > max ? etapa.id : max
          }, 0);
          console.log(max);
          entityStage.Stageslist = [...this.itemTiempo]
          let itemStage: itemStage = { id: MaxId + 1, descripcion: des, tiempoMinutos: parseInt(timer) }
          entityStage.pushItemClas(itemStage);
          this.itemTiempo = entityStage.Stageslist;
        } else {
          // id: number;
          let NuevosValores: itemStage = { id: this.etapaId, descripcion: des, tiempoMinutos: parseInt(timer) }
          const etapaActualizada = this.itemTiempo.map(etapa => {
            if (etapa.id === this.etapaId) {
              return { ...etapa, ...NuevosValores }
            } else {
              return etapa;
            }
          })
          this.itemTiempo = etapaActualizada;
          // console.log(this.itemTiempo)

        }
        this.cleanFieldNew();
      }
    }



  }

  selectedRow(row: any) {
    console.log(row);
    this.etapaId = row.id;
    this.descripcionEtapaValue = row.descripcion;
    this.tiempoEtapaValue = row.tiempoMinutos;
    this.btnAgregar = 'Modificar';
    this.visiblebtnnuevo = true;
  }
  cleanFieldNew() {
    this.etapaId = 0;
    this.limpiarCampos();
  }
  limpiarCampos() {
    this.descripcionEtapaValue = '';
    this.tiempoEtapaValue = ''
    this.btnAgregar = 'Agregar';
    this.visiblebtnnuevo = false;
  }

  async save() {

    if (this.serviceform.valid) {
      let entityStageSave = new EtapaServicio();
      let timer = parseInt(this.serviceform.get('precio')?.value!)
      let tiempoEstimadoServicio = parseInt(this.serviceform.get('tiempoServicio')?.value!);
      entityStageSave.setValues(this.idService, this.serviceform.get('descripcion')?.value!, timer, tiempoEstimadoServicio, this.itemTiempo);
      console.log(JSON.stringify(entityStageSave));

      // if (this.idService > 0) {
      //   console.log('Es una Modificacion')
      // } else {
      if (this.checked && this.itemTiempo.length == 0) {
        console.log('selecciono que tiene etapas y no ha agregado')
        return;
      }

      const save = this._saleService.saveCatService(entityStageSave).subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            this._route.navigate(['/service']);
            console.log('Se guardo correctamente')

          }
          else {
            // this.openSnackBar("Error al guardar  " + response.message);
            console.log(response);
          }

        },
        error: (er: any) => {
          // this.openSnackBar("Error al guardar la venta");
          console.log(er.error);
        }
      });


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
