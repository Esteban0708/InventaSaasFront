import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  rol: string = '';
  menuAbierto: boolean = false;
  menuItems: { label: string, ruta: string, icono: string }[] = [];

  menuAdmin = [
    { label: 'Dashboard', ruta: '/dashboard', icono: '▦' },
    { label: 'Tiendas', ruta: '/tiendas', icono: '🏪' },
    { label: 'Usuarios', ruta: '/usuarios', icono: '👤' },
    { label: 'Facturación', ruta: '/facturacion', icono: '💳' },
    { label: 'Categoria', ruta: '/categorias', icono: '🏷️' },

  ];

  menuTienda = [
    { label: 'Dashboard', ruta: '/dashboard', icono: '▦' },
    { label: 'Inventario', ruta: '/inventario', icono: '📦' },
    { label: 'Ventas', ruta: '/ventas', icono: '📈' },
    { label: 'Costeo', ruta: '/costeo', icono: '💰' },
    { label: 'Categoria', ruta: '/categorias', icono: '🏷️' },

  ];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.menuItems = this.rol === 'admin' ? this.menuAdmin : this.menuTienda;
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}