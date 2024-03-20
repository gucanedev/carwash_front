import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SaleService } from '../../service/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseGeneric } from '../../models/commun';
import { Iservicioswf, IserviciowfPrincipal, Iworkflow, etapaSave, etapaWorkflow } from '../../models/workflow';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';



export interface etapasElement {
  id: number;
  descripcion: string;
  tiempoMinutos?: number | null;
}

export interface header {
  cliente: string,
  servicioDesc: string,
  precioVenta: number,
  ventaId: number
}


@Component({
  selector: 'app-workdetail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, FormsModule,
    MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, MatChipsModule],
  templateUrl: './workdetail.component.html',
  styleUrl: './workdetail.component.css'
})
export class WorkdetailComponent implements OnInit {

  constructor(private _saleService: SaleService,
    private route: ActivatedRoute,
    private _route: Router,
    private _formBuilder: FormBuilder) { }


  etapas: etapaWorkflow[] = [{ id: 0, descripcion: 'inicial', tiempoMinutos: 50, terminada: true }];
  displayedColumns: string[] = ['select', 'id', 'descripcion', 'tiempoMinutos'];

  isChecked = true;


  dynamicForm: FormGroup = this._formBuilder.group({});

  header: header = { cliente: '', precioVenta: 0, ventaId: 0, servicioDesc: '' };

  objEtapasPrincipal: any;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') || 0;
    if (id !== undefined) {
      // this.getWorkFlow(parseInt(id.toString()));
      this.loadData(parseInt(id.toString()));

    }

  }
  addDynamicControls(servicio: Iservicioswf[]) {
    servicio.forEach(eta => {
      eta.etapas.forEach(elemen => {
        this.dynamicForm.addControl(elemen.id.toString(), this._formBuilder.control(elemen.terminada));

      });
    })


  }


  loadData(id: number) {
    const loginreturn = this._saleService.getworkflow(id)
      .subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            // console.log(response.result.etapas);
            // this.etapas = response.result.etapas;
            this.header.cliente = response.result.nombreCliente
            this.header.ventaId = response.result.ventaId
            this.header.precioVenta = response.result.precioVenta
            this.header.servicioDesc = response.result.nombreBien;
            this.objEtapasPrincipal = response.result.servicios;
            console.log(this.objEtapasPrincipal);

            this.addDynamicControls(this.objEtapasPrincipal);
          }
          else {
            // this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);

          }

        },
        error: (er: any) => {

          // this.isLoad = false;
          // this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
          // this._notif.openSnackBar("Ocurrio un error al cargar los servicios", "OK", 5);
        }
      });
  }


  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  save(formGroup: FormGroup): void {
    //  formGroup.get('descripcionetapa')?.value!
    // alert(JSON.stringify(formGroup.value, null, 2));
    // let jsonc = JSON.stringify(formGroup.value);
    // console.log(JSON.stringify(formGroup.value));
    let objetosave: etapaSave[] = []
    for (let key in formGroup.value) {
      // console.log(key + ": " + formGroup.value[key]);
      let etapas: etapaSave = { etapa: key, valor: Boolean(formGroup.value[key]), ventaId: this.header.ventaId };
      objetosave.push(etapas)
    }
    console.log(JSON.stringify(objetosave))


    const save = this._saleService.saveWorkflow(objetosave).subscribe({
      next: (response: ResponseGeneric) => {
        if (response.isSuccess) {
          this._route.navigate(['/lobby']);
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




  }
  cancelar(): void {
    this._route.navigate(['/lobby']);
  }


}

