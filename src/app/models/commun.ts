
export interface ResponseGeneric {
    isSuccess: boolean;
    message: string;
    result: any;

}

export interface ABS {
    id: number;
    descripcion: string;
}
export interface DialogService {
    descripcion: string;
    costo: number;
    cancelar: string;
}

export interface IJwt {
    token: string;
    tokenRefresh: string
}