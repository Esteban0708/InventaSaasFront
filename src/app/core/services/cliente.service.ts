import { Injectable } from '@angular/core';
import { ClienteDTO } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private clientes: ClienteDTO[] = [
    {
      documento: '1075489623',
      tipo: 'natural',
      nombre: 'Martha Trujillo',
      direccion: 'Calle 10 # 5-20',
      correo: 'martha@email.com',
      regimen: 'simplificado'
    },
    {
      documento: '900123456',
      tipo: 'empresa',
      nombre: 'Distribuidora Los Andes',
      direccion: 'Carrera 5 # 10-30',
      correo: 'contacto@losandes.com',
      regimen: 'comun'
    }
  ];

  buscarPorDocumento(documento: string): ClienteDTO | null {
    return this.clientes.find(c => c.documento === documento) ?? null;
  }

  guardar(cliente: ClienteDTO): void {
    const existe = this.clientes.findIndex(c => c.documento === cliente.documento);
    if (existe !== -1) {
      this.clientes[existe] = cliente;
    } else {
      this.clientes.push(cliente);
    }
  }
}