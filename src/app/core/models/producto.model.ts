export interface ProductoDTO {
    nombre: string;
    ref: string;
    categoria: string;
    proveedor: string;
    stock: number;
    min: number;
    costo: string;
    pventa: string;
    estado: "normal" | "bajo" | "critico";
}