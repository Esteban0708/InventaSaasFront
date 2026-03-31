export interface ClienteDTO {
  documento: string;
  tipo: 'natural' | 'empresa';
  nombre: string;
  direccion: string;
  correo: string;
  regimen: 'simplificado' | 'comun' | 'gran_contribuyente';
}