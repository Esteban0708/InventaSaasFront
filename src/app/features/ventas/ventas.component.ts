import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductoDTO } from 'src/app/core/models/producto.model';
import { ClienteDTO } from 'src/app/core/models/cliente.model';
import { ItemVentaDTO } from 'src/app/core/models/venta.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { VentaService } from 'src/app/core/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, OnDestroy {

  @ViewChild('inputBusqueda') inputBusqueda!: ElementRef<HTMLInputElement>;

  escaneandoCamara: boolean = false;
  camarasDisponibles: MediaDeviceInfo[] = [];
  camaraSeleccionada!: MediaDeviceInfo;

  constructor(
    private clienteService: ClienteService,
    private ventaService: VentaService
  ) { }


  productos: ProductoDTO[] = [
    { nombre: 'Arroz Diana X50', ref: 'ARR-50', categoria: 'Abarrotes', proveedor: 'Diana', stock: 84, min: 20, costo: '$42.000', pventa: '$52.000', estado: 'normal' },
    { nombre: 'Leche Alquería 1L', ref: 'LAC-01', categoria: 'Lácteos', proveedor: 'Alquería', stock: 18, min: 20, costo: '$2.800', pventa: '$3.500', estado: 'bajo' },
    { nombre: 'Agua Cristal 600ml', ref: 'BEB-06', categoria: 'Bebidas', proveedor: 'Postobón', stock: 212, min: 50, costo: '$850', pventa: '$1.200', estado: 'normal' },
    { nombre: 'Jabón Rey x3', ref: 'ASE-07', categoria: 'Aseo', proveedor: 'Unilever', stock: 55, min: 30, costo: '$7.400', pventa: '$9.500', estado: 'normal' },
    { nombre: 'Café Águila Roja', ref: 'CAF-01', categoria: 'Bebidas', proveedor: 'Águila', stock: 4, min: 10, costo: '$8.500', pventa: '$11.000', estado: 'critico' },
    { nombre: 'Sal Refisal 1kg', ref: 'SAL-01', categoria: 'Abarrotes', proveedor: 'Refisal', stock: 70, min: 20, costo: '$1.200', pventa: '$1.800', estado: 'normal' },
    { nombre: 'Atún Van Camps', ref: 'ATU-01', categoria: 'Enlatados', proveedor: 'Van Camps', stock: 33, min: 15, costo: '$4.200', pventa: '$5.500', estado: 'normal' },
  ];

  terminoBusqueda: string = '';

  get productosFiltrados(): ProductoDTO[] {
    const q = this.terminoBusqueda.toLowerCase().trim();
    if (!q) return this.productos;
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q)
    );
  }

  abrirEscaner(): void {
    this.escaneandoCamara = true;
  }

  cerrarEscaner(): void {
    this.escaneandoCamara = false;
  }

  onCodigoEscaneado(codigo: string): void {
    this.escaneandoCamara = false;
    this.buscarPorCodigo(codigo);
  }

  onEnterBusqueda(evento: KeyboardEvent): void {
    if (evento.key === 'Enter') {
      const valor = (evento.target as HTMLInputElement).value.trim();
      if (valor) this.buscarPorCodigo(valor);
    }
  }

  buscarPorCodigo(codigo: string): void {
    const producto = this.productos.find(
      p => p.ref.toLowerCase() === codigo.toLowerCase()
    );
    if (producto) {
      this.agregarAlCarrito(producto);
      this.terminoBusqueda = '';           
    } else {
      alert(`Producto con código "${codigo}" no encontrado`);
    }
  }
  precioNumerico(pventa: string): number {
    return parseInt(pventa.replace(/\./g, '').replace('$', ''));
  }
  onCamarasEncontradas(camaras: MediaDeviceInfo[]): void {
    this.camarasDisponibles = camaras;
    this.camaraSeleccionada = camaras[0];   
  }

  carrito: ItemVentaDTO[] = [];

  agregarAlCarrito(producto: ProductoDTO): void {
    const existe = this.carrito.find(i => i.producto.ref === producto.ref);
    if (existe) {
      existe.cantidad++;
      existe.subtotal = existe.cantidad * this.precioNumerico(producto.pventa);
    } else {
      this.carrito.push({
        producto,
        cantidad: 1,
        subtotal: this.precioNumerico(producto.pventa)
      });
    }
  }

  cambiarCantidad(item: ItemVentaDTO, delta: number): void {
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      this.eliminarDelCarrito(item);
      return;
    }
    item.subtotal = item.cantidad * this.precioNumerico(item.producto.pventa);
  }

  eliminarDelCarrito(item: ItemVentaDTO): void {
    this.carrito = this.carrito.filter(i => i.producto.ref !== item.producto.ref);
  }

  get subtotal(): number {
    return this.carrito.reduce((acc, i) => acc + i.subtotal, 0);
  }

  get iva(): number {
    return this.ventaService.calcularIva(this.subtotal);
  }

  get total(): number {
    return this.ventaService.calcularTotal(this.subtotal, this.iva, this.descuento);
  }

  descuento: number = 0;

  formatearPrecio(valor: number): string {
    return '$' + valor.toLocaleString('es-CO');
  }

  metodoPago: 'efectivo' | 'transferencia' | 'tarjeta' = 'efectivo';

  documentoBusqueda: string = '';
  estadoCliente: 'idle' | 'buscando' | 'encontrado' | 'no_encontrado' = 'idle';
  clienteEncontrado: ClienteDTO | null = null;
  mostrarFormNuevo: boolean = false;

  busqueda$ = new Subject<string>();

  nuevoCliente: ClienteDTO = this.clienteVacio();

  clienteVacio(): ClienteDTO {
    return { documento: '', tipo: 'natural', nombre: '', direccion: '', correo: '', regimen: 'simplificado' };
  }

  ngOnInit(): void {
    this.busqueda$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(doc => {
      if (!doc.trim()) {
        this.estadoCliente = 'idle';
        this.clienteEncontrado = null;
        return;
      }
      this.estadoCliente = 'buscando';
      setTimeout(() => {
        const resultado = this.clienteService.buscarPorDocumento(doc);
        if (resultado) {
          this.clienteEncontrado = resultado;
          this.estadoCliente = 'encontrado';
          this.mostrarFormNuevo = false;
        } else {
          this.clienteEncontrado = null;
          this.estadoCliente = 'no_encontrado';
          this.nuevoCliente = this.clienteVacio();
          this.nuevoCliente.documento = doc;
        }
      }, 500);
    });
  }

  ngOnDestroy(): void {
    this.busqueda$.complete();
  }

  onInputDocumento(evento: Event): void {
    this.documentoBusqueda = (evento.target as HTMLInputElement).value;
    this.busqueda$.next(this.documentoBusqueda);
  }

  mostrarFormCrear(): void {
    this.mostrarFormNuevo = true;
  }

  guardarNuevoCliente(): void {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.documento) return;
    this.clienteService.guardar(this.nuevoCliente);
    this.clienteEncontrado = { ...this.nuevoCliente };
    this.estadoCliente = 'encontrado';
    this.mostrarFormNuevo = false;
  }

  get puedeFacturar(): boolean {
    return this.carrito.length > 0 && this.estadoCliente === 'encontrado';
  }

  generarFactura(): void {
    if (!this.puedeFacturar || !this.clienteEncontrado) return;
    const venta = this.ventaService.registrar({
      fecha: new Date(),
      cliente: this.clienteEncontrado,
      items: this.carrito,
      subtotal: this.subtotal,
      iva: this.iva,
      descuento: this.descuento,
      total: this.total,
      metodoPago: this.metodoPago
    });
    console.log('Factura generada:', venta);
    this.carrito = [];
    this.estadoCliente = 'idle';
    this.clienteEncontrado = null;
    this.documentoBusqueda = '';
  }
}