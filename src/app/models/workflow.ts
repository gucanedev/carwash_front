export interface Iworkflow {
    id: number;
    ventaId: number;
    nombreCliente: string;
    nombreServicio: string;
    precioVenta: number;
    etapas: etapaWorkflow[];
}

export interface IserviciowfPrincipal {
    servicios: Iservicioswf[];
}

export interface Iservicioswf {
    nombreServicio: string;
    etapas: etapaWorkflow[];

}

export interface etapaWorkflow {
    id: number;
    descripcion: string;
    tiempoMinutos: number;
    terminada: boolean;
}

export interface etapaSave {
    etapa: string;
    valor: boolean;
    ventaId: number;
}


