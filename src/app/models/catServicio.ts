
export interface servicelist {
    tiempoEstGeneral: number;
    vehiculosDelante: number;
    servicios: CatServicioH[];

}

export interface CatServicioH {
    id: Number;
    descripcion: string;
    precio: number;
    tiempoEstimado: number;
    tiempoEstGeneral: number;

}
export interface catServiceResult {
    id: Number;
    descripcion: string;
    precio: number;
    tiempoEstimado: number;
    tieneEtapas: boolean;
    etapas: Array<itemStage>;

}

export interface itemStage {
    id: number;
    descripcion: string;
    tiempoMinutos: number;

}


export interface CatService {
    isSuccess: boolean;
    result: CatServicioH[];
}

export interface CatServiceSale {
    isSuccess: boolean;
    result: servicelist;
}

export interface CatABS {
    isSuccess: boolean;
    result: catServiceResult;
}


export class EtapaServicio {
    id: number = 0;
    descripcion: string;
    tiempo: number;
    precio: number = 0;
    Stageslist: Array<itemStage> = [];
    etapas: Array<itemStage> = [];
    constructor() {
        this.tiempo = 0;
        this.descripcion = '';
    }
    setValues(id: number, desc: string, tie: number, tiempo: number, etap: Array<itemStage>) {
        this.id = id;
        this.descripcion = desc
        this.precio = tie;
        this.tiempo = tiempo;
        this.etapas = etap;
    }

    pushItemClas(entity: itemStage) {
        this.Stageslist.push(entity);
    }

}