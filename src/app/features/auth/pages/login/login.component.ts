import { getLocaleDirection } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  miEmail: string = '';
  Contrasena: string = '';

  modoRegistro = false;

  Nombres: string = '';
  Apellidos: string = '';
  Correo: string = '';
  Telefono: string = '';

  mensajeError = '';
  mensajeExito = '';

  constructor(private router: Router, private authServices: AuthService) {

  }

  cambiarModo(valor: boolean) {
    this.modoRegistro = valor;
    this.mensajeError = '';
    this.mensajeExito = '';
  }
  regresar() {
    this.router.navigate(['/'])
  }
  iniciarSesion(): void {
  if (!this.miEmail || !this.Contrasena) return;

  this.authServices.login({
    email: this.miEmail,
    password: this.Contrasena
  }).subscribe({
    next: (res) => {
      this.authServices.guardarToken(res.token);
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.mensajeError = 'Correo o contraseña incorrectos';
    }
  });
}
   crearCuenta(): void {
    if (!this.Nombres || !this.Apellidos || !this.Correo || !this.Telefono || !this.Contrasena) return;

    this.authServices.registrar({
      nombres: this.Nombres,
      apellidos: this.Apellidos,
      email: this.Correo,
      telefono: this.Telefono,
      password: this.Contrasena
    }).subscribe({
      next: () => {
        this.mensajeExito = 'Cuenta creada correctamente, inicia sesión';
        this.cambiarModo(false);
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'Error al registrar';
      }
    });
  }
}
