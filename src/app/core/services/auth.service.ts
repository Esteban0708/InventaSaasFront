import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO, RegisterDTO, AuthResponse } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(dto: LoginDTO): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto);
  }

  registrar(dto: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch {
      return null;
    }
  }
  ObtenerNombre(): string | null {
    const token = this.obtenerToken();
    if(!token) return null; 
    try{
      const decoded: any = jwtDecode(token); 
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    }catch{
      return null;
    }
  }
  getNombreCompleto(): string{
    return this.ObtenerNombre() ?? '';
  }
  getRol(): string {
    return this.obtenerRol() ?? '';
  }
}