import { Component } from '@angular/core';

@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styleUrls: ['./costeo.component.css']
})
export class CosteoComponent {
  precioCompra: number = 0;
  almacenamiento: number = 3;
  flete: number = 200;
  impuesto: number = 50000;
  manoobra: number = 150000;
  merma: number = 0;
  otros: number = 2000;
  total: number = 0;


  editandoMargen = false;
  margen = 20;
  constructor() {
    this.calcularTotalUnitario();
  }

  calcularTotalUnitario() {
    this.total = (this.precioCompra + this.almacenamiento + this.flete + this.impuesto + this.manoobra + this.merma + this.otros)
    return this.total;
  }
  toggleEditarMargen(): void {
  const btn = document.getElementById('btnMargen');
  const input = document.getElementById('margenInput') as HTMLInputElement;
  const display = document.getElementById('margenDisplay');

  if (!this.editandoMargen) {
    // activar edición
    this.editandoMargen = true;
    input?.classList.remove('oculto');
    display?.classList.add('oculto');
    btn!.textContent = 'Guardar';
    btn?.classList.add('guardando');
    input?.focus();
  } else {
    // guardar
    this.margen = parseFloat(input?.value || '20') || 20;
    this.editandoMargen = false;
    input?.classList.add('oculto');
    display?.classList.remove('oculto');
    btn!.textContent = 'Editar';
    btn?.classList.remove('guardando');
    this.actualizarMargen();
  }
}

actualizarMargen(): void {
  const display = document.getElementById('margenDisplay');
  const estado = document.getElementById('margenEstado');
  const card = document.querySelector('.margen-ganancia');

  if (display) display.textContent = this.margen + '%';

  card?.classList.remove('bajo', 'critico');

  if (this.margen < 10) {
    if (estado) estado.textContent = 'Margen crítico, riesgo de pérdida';
    card?.classList.add('critico');
  } else if (this.margen < 20) {
    if (estado) estado.textContent = 'Margen bajo, considera aumentarlo';
    card?.classList.add('bajo');
  } else {
    if (estado) estado.textContent = 'Margen saludable';
  }
}
}
