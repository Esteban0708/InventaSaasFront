import { ClienteDTO } from './cliente.model';
import { ProductoDTO } from './producto.model';

export interface ItemVentaDTO {
  producto: ProductoDTO;
  cantidad: number;
  subtotal: number;
}

export interface VentaDTO {
  id?: string;
  fecha: Date;
  cliente: ClienteDTO;
  items: ItemVentaDTO[];
  subtotal: number;
  iva: number;
  descuento: number;
  total: number;
  metodoPago: 'efectivo' | 'transferencia' | 'tarjeta';
}