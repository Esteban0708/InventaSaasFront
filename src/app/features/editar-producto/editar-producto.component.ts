import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { ProductoDTO } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  @Input() producto: ProductoDTO | null = null;
  @Input() visible: boolean=false; 
  
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<ProductoDTO>();

  productoCopia: ProductoDTO | null = null; 
  
  ngOnChanges():void{
    if(this.producto){
      this.productoCopia = {...this.producto};
    }
  }

  onCerrar(): void{
    this.cerrar.emit();
  }

  onGuardar(): void{
    if(this.productoCopia){
      this.guardar.emit(this.productoCopia);
    }
  }
}
