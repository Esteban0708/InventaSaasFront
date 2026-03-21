import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  rol: string = '';
  fecha: string = '';
  nombreCompleto: string | null = ''; 
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.nombreCompleto = this.authService.ObtenerNombre(); 
    this.fecha = new Date().toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}