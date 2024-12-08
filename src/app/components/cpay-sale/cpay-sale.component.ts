import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SaleService } from '../../service/sale.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatService } from '../../models/catServicio';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { ABS, ResponseGeneric } from '../../models/commun';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpay-sale',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './cpay-sale.component.html',
  styleUrl: './cpay-sale.component.css'
})
export class CpaySaleComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'descripcion'];
  dataSource: MatTableDataSource<any>;

  constructor(private _SaleService: SaleService, private _router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.getServicesBD();
  }


  getServicesBD() {
    // let CatServicioHija: CatServicioH[];
    const loginreturn = this._SaleService.getPendingSale()
      .subscribe({
        next: (response: ResponseGeneric) => {
          if (response.isSuccess) {
            this.dataSource = new MatTableDataSource(response.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          }
          else {
            console.log('Error');

            // this.isLoad = false;
          }

        },
        error: (er: any) => {
          console.log('Error')
          // this.openSnackBar("Ocurrio un error al cargar los servicios");
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  regresa() {
    this._router.navigate(['/lobby']);
  }

  selectedRow(row: any) {

    this._router.navigate([`sumarysale/${row.id}`]);
  }

}
