import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CatServicioH } from '../../models/catServicio';
import { carritoCompra } from '../../models/Sales';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-searchcustomer',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './searchcustomer.component.html',
  styleUrl: './searchcustomer.component.css'
})
export class SearchcustomerComponent implements OnInit {
  @Input() carritoL: carritoCompra[] = [];

  @Output() carritoEvent = new EventEmitter<carritoCompra[]>();

  ngOnInit(): void {
    // this.carritoL = this.carrito;

  }

  // actualizarCantidad(id: Number, event: any) {
  //   const cantidad = event.target.value;
  //   const item = this.carrito.find(item => item.id === id);

  //   if (item) {
  //     item.cantidad = cantidad;
  //   }
  // }
  actualizarCantidad(id: Number, event: any) {
    const cantidad = event.target.value;
    const item = this.carritoL.find(item => item.id === id);

    if (item) {
      item.cantidad = cantidad;

    }
  }


  getTotalVenta(): number {

    let res = this.carritoL.map(t => t).reduce((acc, value) => acc + (value.precio * value.cantidad), 0);
    return res;
  }

  // sumar(ser: CatServicioH): void {
  //   ser = { ...ser, precio: ser.precio * 2 }

  //   console.log(ser);
  // }


  // sumar(id: Number, cantidad: number) {
  //   // const cantidad = event.target.value;
  //   let item = this.carrito.find(item => item.id === id);

  //   if (item) {
  //     item.cantidad++;

  //   }
  //   console.log(this.carrito);
  // }

  sumar(id: Number, cantidad: number) {
    // const cantidad = event.target.value;
    let item = this.carritoL.find(item => item.id === id);

    if (item) {
      item.cantidad++;
      // item.precio = item.cantidad * item.precio;
    }
    // console.log(this.carritoL);
  }

  restar(id: Number, cantidad: number) {
    let item = this.carritoL.find(item => item.id === id);
    if (item) {
      item.cantidad--;
    }

  }


  delete(id: Number) {
    this.carritoL = this.carritoL.filter((prod) => {
      return prod.id != id
    });
    this.carritoEvent.emit(this.carritoL);


  }


}
