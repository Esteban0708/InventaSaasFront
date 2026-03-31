import { Injectable } from '@angular/core';
import { VentaDTO } from '../models/venta.model';

@Injectable({ providedIn: 'root' })
export class VentaService {

  private ventas: VentaDTO[] = [];
  private readonly IVA = 0.19;

  calcularSubtotal(ventas: { cantidad: number; precio: number }[]): number {
    return ventas.reduce((acc, i) => acc + i.cantidad * i.precio, 0);
  }

  calcularIva(subtotal: number): number {
    return Math.round(subtotal * this.IVA);
  }

  calcularTotal(subtotal: number, iva: number, descuento: number): number {
    return subtotal + iva - descuento;
  }

  registrar(venta: VentaDTO): VentaDTO {
    const nueva = { ...venta, id: Date.now().toString(), fecha: new Date() };
    this.ventas.push(nueva);
    return nueva;
  }

  obtenerTodas(): VentaDTO[] {
    return this.ventas;
  }
}