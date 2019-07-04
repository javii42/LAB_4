import { ClientesComponent } from './../Components/principal/clientes/clientes.component';
import { ServiciosComponent } from './../Components/principal/servicios/servicios.component';
import { PrincipalComponent } from './../Components/principal/principal.component';
import { RelacionComponent } from './../Components/principal/relacion/relacion.component';
import { LoginComponent } from './../Components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Common/auth.guard';
import { EstadisticasComponent } from '../Components/principal/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', redirectTo: 'Principal', pathMatch: 'full' },
  { path: 'Principal', component: PrincipalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrador', 'Cliente']},
    children: [
      { path: '', redirectTo: 'Relacion', pathMatch: 'full' },
      {
        path: 'Compras',
        component: ServiciosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Administrador','Cliente'] }
      },
      {
        path: 'Productos',
        component: ClientesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Profesor', 'Administrador','Cliente'] }
      },
      {
        path: 'Relacion',
        component: RelacionComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Profesor', 'Administrador','Cliente'] }
      },
      {
        path: 'Estadisticas',
        component: EstadisticasComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Administrador'] }
      },
    ]
  },
  {
    path: 'Login', component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ],
  declarations: [
  ]
})
export class AppRoutingModule { }
