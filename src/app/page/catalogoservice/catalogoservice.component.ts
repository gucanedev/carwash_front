import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CatService, CatServicioH } from '../../models/catServicio';
import { SaleService } from '../../service/sale.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogoservice',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './catalogoservice.component.html',
  styleUrl: './catalogoservice.component.css'
})
export class CatalogoserviceComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _SaleService: SaleService, private _route: Router) {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  serviceN: CatServicioH[] = [];
  displayedColumns: string[] = ['id', 'descripcion'];
  dataSource: MatTableDataSource<any>;


  ngAfterViewInit(): void {
    this.getServicesBD();
  }

  getServicesBD() {
    // this._SaleService.getCollectionValueChange<CatServicio>('service').subscribe(res => {

    //   this.dataSource = new MatTableDataSource(res);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;

    // })


    let CatServicioHija: CatServicioH[];
    const loginreturn = this._SaleService.getAllService()
      .subscribe({
        next: (response: CatService) => {
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

  newService() {
    this._route.navigate([`service/0`]);
  }

  selectedRow(row: any) {
    this._route.navigate([`service/${row.id}`]);

  }

}
