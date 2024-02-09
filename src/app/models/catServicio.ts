
export interface CatServicioH {
    id: Number;
    descripcion: string;
    precio: number;

}


export interface CatService {
    isSuccess: boolean;
    result: CatServicioH[];
}

export interface CatABS {
    isSuccess: boolean;
    result: CatServicioH;
}