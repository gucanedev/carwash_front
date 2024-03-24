export interface itemSales {
    item: string;
    cost: number;
}

export interface IServicioSelect {
    id: Number;
    descripcion: string;
}

export interface IWaitinList {
    id: number;
    nombreCliente: string;
    nombreServicio: string;
    etapaDesc: string;
    tiempoTranscurrido: string;
    fechaCreo: string;
}

export interface carritoCompra {
    id: Number;
    descripcion: string;
    precio: number;
    cantidad: number;


}

export class Venta {
    salesId: number;
    clienteNombre: string;
    descripcion: string;
    telefono: string;
    isPaquete: boolean;
    paqueteId: number;
    servicioIds: Array<Number> = [1];
    servicioList: Array<itemSales> = [];
    itemSale: itemSales = { item: '', cost: 0 };
    total: number;

    constructor() {
        this.salesId = 0;
        this.clienteNombre = '';
        this.descripcion = '';
        this.telefono = '';
        this.isPaquete = false;
        this.paqueteId = 0;
        this.total = 0.0;

    }
    SetValues(salesId: number, clienteNombre: string, descripcion: string, telefono: string, isPaquete: boolean, paqueteId: number, iDS: number[], total: number) {
        this.salesId = salesId;
        this.clienteNombre = clienteNombre;
        this.descripcion = descripcion;
        this.telefono = telefono.toString();
        this.isPaquete = isPaquete;
        this.paqueteId = paqueteId;
        this.servicioIds = iDS;
        this.total = total;

    }

    pushItemSale(item?: string, cost?: number) {
        this.itemSale.item = item!;
        this.itemSale.cost = cost!;
        this.servicioList.push(this.itemSale);
    }
    pushItemSale2(entity: itemSales) {
        this.servicioList.push(entity);
    }

}