import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoDTO } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent {

  
  @Input() producto:  ProductoDTO | null = null;
  @Input() visible: boolean=false;
  
  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<ProductoDTO>();
  
  onCerrar():void{
    this.cerrar.emit();
  }
  onConfirmar():void{
    if(this.producto){
      this.confirmar.emit(this.producto);
    }
  }
}
