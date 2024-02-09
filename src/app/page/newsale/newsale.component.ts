import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { CatService, CatServicioH } from '../../models/catServicio';
import { IServicioSelect, Venta, itemSales } from '../../models/Sales';
import { SaleService } from '../../service/sale.service';
import { DialogPayComponent } from '../../components/dialog-pay/dialog-pay.component';
import { Router } from '@angular/router';
import { ResponseGeneric } from '../../models/commun';



@Component({
  selector: 'app-newsale',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatSelectModule, FormsModule, MatSnackBarModule, MatTableModule],
  templateUrl: './newsale.component.html',
  styleUrl: './newsale.component.css'
})
export class NewsaleComponent implements OnInit {

  constructor(private fb: FormBuilder, private _saleSerice: SaleService,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {

  }


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // objservi: CatServicioH = { servicioId: 1, descripcion: "" };
  serviceList: CatServicioH[] = [{ id: 1, descripcion: "No hay registros", precio: 0 }];
  // serviceList2: CatServicioH = { servicioId: 1, descripcion: "Inicial" };
  toppingListfb: IServicioSelect[] = [{ id: 1, descripcion: "asdasd" }];

  itemVenta: itemSales[] = [];

  client = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  service = new FormControl('', [Validators.required]);
  package = new FormControl('');
  telephone = new FormControl('');
  displayedColumns: string[] = ['item', 'cost'];
  AcctionButton: string = '';
  name: number = 0;
  totalVenta: number = 0;

  salesForm = this.fb.group({
    client: [''],
    description: [''],
    service: [],
    package: [],
    telephone: []

  });
  selected: number[] = [];
  selectedCar = this.serviceList[0].id;

  ngOnInit(): void {
    this.getServicesBD();
  }


  getErrorMessage() {
    if (this.client.hasError('required')) {
      return 'Campo obligatorio';
    } else
      return '';
  }

  geteErrorDescripcion() {
    if (this.description.hasError('required')) {
      return 'Campo obligatorio';
    } else
      return '';
  }
  geteErrorService() {

    if (this.selected.length <= 0) {
      return 'Campo obligatorio';

    } else
      return '';
  }

  //muestra el toast
  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  getTotalCost() {

    this.totalVenta = this.itemVenta.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    return this.totalVenta
  }


  getServicesBD() {
    let CatServicioHija: CatServicioH[];
    const loginreturn = this._saleSerice.getAllService()
      .subscribe({
        next: (response: CatService) => {
          if (response.isSuccess) {
            this.serviceList = response.result;
            // this.isLoad = false;

          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          // this.isLoad = false;
          // this.messageError = "Ocurrio un error al intentar Iniciar Sesión";
          this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });
  }

  openDialog() {
    if (this.salesForm.valid) {

      let total: number = this.getTotalCost();

      if (total <= 0) {
        console.log('No hay nada')
        this.openSnackBar("Agregar servicios a la lista");
        return;
      }


      const dialogRef = this.dialog.open(DialogPayComponent, {
        data: { name: total, animal: this.AcctionButton, cancelar: "cancelar" },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'cancelar') {
          this.saveSale()

          this.AcctionButton = '';
        }

        console.log(result);



      });
    }
  }


  vewSalesDetail() {

    if (this.salesForm.valid) {
      let entity = new Venta();

      this.selected.forEach((elemen) => {
        let filter = this.serviceList.find(elem => elem.id == elemen);
        let itemS: itemSales = { item: filter?.descripcion ?? '', cost: filter?.precio ?? 0 };
        entity.pushItemSale2(itemS);
      });

      this.itemVenta = entity.servicioList;

    }

  }
  saveSale() {
    if (this.salesForm.valid) {

      if (this.itemVenta.length <= 0) {
        this.openSnackBar("Agregar servicios a la lista");
        return;
      }
      console.log(this.totalVenta);
      let entity = new Venta();

      entity.SetValues(0, this.salesForm.get('client')?.value!, this.salesForm.get('description')?.value!, this.salesForm.get('telephone')?.value!, false, 0, this.selected, this.totalVenta);

      const save = this._saleSerice.saveSale(entity).subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            this._router.navigate(['/lobby']);
            console.log('Se guardo correctamente')

          }
          else {
            this.openSnackBar("Error al guardar  " + response.message);
            console.log(response);
          }

        },
        error: (er: any) => {
          this.openSnackBar("Error al guardar la venta");
          console.log(er.error);
        }
      });


    }

  }

}
