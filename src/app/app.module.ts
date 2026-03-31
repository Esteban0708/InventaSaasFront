import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './features/auth/pages/home/home.component';
import {  HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TiendasComponent } from './features/tiendas/tiendas.component';
import { InventarioComponent } from './features/inventario/inventario.component';
import { VentasComponent } from './features/ventas/ventas.component';
import { CosteoComponent } from './features/costeo/costeo.component';
import { FacturacionComponent } from './features/facturacion/facturacion.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './features/usuarios/usuarios.component';
import { EditarProductoComponent } from './features/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './features/eliminar-producto/eliminar-producto.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar/topbar.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    TiendasComponent,
    InventarioComponent,
    VentasComponent,
    CosteoComponent,
    FacturacionComponent,
    LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    UsuariosComponent,
    EditarProductoComponent,
    EliminarProductoComponent
  ],
  imports: [
    ZXingScannerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
