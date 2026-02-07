export interface ICarWhashers {
    carWasherId: number;
    name: string;
    cantidad:number;
    total:number
}

export interface ICarWhashersDetails {
    description:string;
    employeName: string;
    CreateDate:Date;
    price:number
}

export interface ISalesMonthly {
    fecha:string;
    total: number;
    registros:number
}