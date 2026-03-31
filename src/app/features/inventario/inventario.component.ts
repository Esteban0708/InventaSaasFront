import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductoDTO } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {


  modalEliminarAbierto: boolean = false;
  productoAEliminar: ProductoDTO | null = null;

  modalEditarAbierto: boolean = false; 
  productoSeleccionado: ProductoDTO | null = null

  constructor(private router: Router) { }

   productos: ProductoDTO[] = [
    { nombre: "Arroz Diana X50", ref: "ARR-50", categoria: "Abarrotes", proveedor: "Diana", stock: 84, min: 20, costo: "$42.000", pventa: "$52.000", estado: "normal" },
    { nombre: "Leche Alquería 1L", ref: "LAC-01", categoria: "Lácteos", proveedor: "Alquería", stock: 18, min: 20, costo: "$2.800", pventa: "$3.500", estado: "bajo" },
    { nombre: "Aceite Gourmet X3", ref: "ACE-03", categoria: "Abarrotes", proveedor: "Gourmet", stock: 3, min: 15, costo: "$18.500", pventa: "$24.000", estado: "critico" },
    { nombre: "Agua Cristal 600ml", ref: "BEB-06", categoria: "Bebidas", proveedor: "Postobón", stock: 212, min: 50, costo: "$850", pventa: "$1.200", estado: "normal" },
    { nombre: "Azúcar Riopaila 5kg", ref: "AZU-05", categoria: "Abarrotes", proveedor: "Riopaila", stock: 9, min: 10, costo: "$14.200", pventa: "$17.000", estado: "bajo" },
    { nombre: "Jabón Rey x3", ref: "ASE-07", categoria: "Aseo", proveedor: "Unilever", stock: 55, min: 30, costo: "$7.400", pventa: "$9.500", estado: "normal" },
    { nombre: "Sal Refisal 1kg", ref: "SAL-01", categoria: "Abarrotes", proveedor: "Refisal", stock: 70, min: 20, costo: "$1.200", pventa: "$1.800", estado: "normal" },
    { nombre: "Café Águila Roja", ref: "CAF-01", categoria: "Bebidas", proveedor: "Águila", stock: 4, min: 10, costo: "$8.500", pventa: "$11.000", estado: "critico" },
    { nombre: "Atún Van Camps", ref: "ATU-01", categoria: "Enlatados", proveedor: "Van Camps", stock: 33, min: 15, costo: "$4.200", pventa: "$5.500", estado: "normal" },
    { nombre: "Pasta Doria 500g", ref: "PAS-01", categoria: "Abarrotes", proveedor: "Doria", stock: 6, min: 10, costo: "$2.100", pventa: "$3.000", estado: "bajo" },
    { nombre: "Mantequilla Rama", ref: "MAN-01", categoria: "Lácteos", proveedor: "Unilever", stock: 22, min: 15, costo: "$5.800", pventa: "$7.200", estado: "normal" },
    { nombre: "Shampoo Head&Sh", ref: "SHA-01", categoria: "Aseo", proveedor: "P&G", stock: 2, min: 8, costo: "$12.000", pventa: "$15.500", estado: "critico" },
  ];
  productoXpagina: number = 5;
  paginaActual: number = 1;
  terminoBusqueda: string = "";
  filtroCategoria: string = "";
  filtroEstado: string = "";

  ngOnInit(): void { }


  get categoria(): string[] {
    return [... new Set(this.productos.map(p => p.categoria))].sort();
  }
  get productosFiltrados(): ProductoDTO[] {
    return this.productos.filter(p => {

      const q = this.terminoBusqueda.toLowerCase().trim();
      const coincideBusqueda = !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.proveedor.toLowerCase().includes(q);

      const coincideCategoria = !this.filtroCategoria || p.categoria === this.filtroCategoria;

      const coincideEstado = !this.filtroEstado || p.estado === this.filtroEstado;

      return coincideBusqueda && coincideCategoria && coincideEstado;
    });
  }
  onFiltrarCategoria(evento: Event): void {
    this.filtroCategoria = (evento.target as HTMLSelectElement).value;
    this.paginaActual = 1;
  }

  onFiltrarEstado(evento: Event): void {
    this.filtroEstado = (evento.target as HTMLSelectElement).value;
    this.paginaActual = 1;
  }

  get productosPaginados(): ProductoDTO[] {
    const inicio = (this.paginaActual - 1) * this.productoXpagina;
    return this.productosFiltrados.slice(inicio, inicio + this.productoXpagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productosFiltrados.length / this.productoXpagina);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get infoMostrando(): string {
    const inicio = (this.paginaActual - 1) * this.productoXpagina + 1;
    const fin = Math.min(this.paginaActual * this.productoXpagina, this.productosFiltrados.length);
    const total = this.productosFiltrados.length;
    return total ? `Mostrando ${inicio}–${fin} de ${total} productos` : "Sin resultados";
  }
  irAPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
  }

  anterior(): void {
    this.irAPagina(this.paginaActual - 1);
  }

  siguiente(): void {
    this.irAPagina(this.paginaActual + 1);
  }

  onBuscar(evento: Event): void {
    this.terminoBusqueda = (evento.target as HTMLInputElement).value;
    this.paginaActual = 1;
  }

  claseStock(estado: string): string {
    return { normal: "stock-normal", bajo: "stock-bajo", critico: "stock-critico" }[estado] ?? "stock-normal";
  }

  claseBadge(estado: string): string {
    return { normal: "badge-normal", bajo: "badge-bajo", critico: "badge-critico" }[estado] ?? "badge-normal";
  }

  textoBadge(estado: string): string {
    return { normal: "Normal", bajo: "Stock bajo", critico: "Crítico" }[estado] ?? estado;
  }

  ajustar(producto: ProductoDTO): void {
    console.log("Ajustar stock:", producto);
  }

  eliminar(producto: ProductoDTO): void {
   this.productoAEliminar = producto;
    this.modalEliminarAbierto = true;
  }
  onCerrarEliminar(): void {
    this.modalEliminarAbierto = false;
    this.productoAEliminar = null;
  }
  onConfirmarEliminacion(producto: ProductoDTO): void {
    this.productos = this.productos.filter(p => p.ref !== producto.ref);
    if(this.paginaActual > this.totalPaginas){
      this.paginaActual = this.totalPaginas;
    }
    this.onCerrarEliminar();
  }
  costeoproducto() {
    this.router.navigate(["/costeo"])
  }
  editar(producto: ProductoDTO): void{
    this.productoSeleccionado = producto;
    this.modalEditarAbierto = true;
  }
  onCerrarModal(): void{
    this.modalEditarAbierto = false;
    this.productoSeleccionado = null; 
  }
  onGuardarEdicion(productoEditado: ProductoDTO): void{
    const index = this.productos.findIndex(p => p.ref == productoEditado.ref);
    if(index !== -1){
      this.productos[index] = {...productoEditado};
    }
    this.onCerrarModal();
  }
}
