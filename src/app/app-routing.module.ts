import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { HomeComponent } from './features/auth/pages/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TiendasComponent } from './features/tiendas/tiendas.component';
import { InventarioComponent } from './features/inventario/inventario.component';
import { VentasComponent } from './features/ventas/ventas.component';
import { CosteoComponent } from './features/costeo/costeo.component';
import { FacturacionComponent } from './features/facturacion/facturacion.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent },
      { path: 'tiendas', component: TiendasComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'costeo', component: CosteoComponent },
      { path: 'facturacion', component: FacturacionComponent },
    ]
  },
    { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
