export default interface Factura {
imagen: any;
    id?: string;
    numeroFactura: number;
    fechaEmision: Date;
    empresa: string;
    nif: string;
    direccion: string;
    baseImponible: number;
    iva: number;
    total: number;
}