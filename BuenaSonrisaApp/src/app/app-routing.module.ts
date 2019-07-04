import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Common/auth.guard';
import { PrincipalComponent } from './Components/principal/principal.component';
import { LoginComponent } from './Components/login/login.component';
import { PedirTurnoComponent } from './Components/pedir-turno/pedir-turno.component';
import { ReseniaComponent } from './Components/resenia/resenia.component';
import { EncuestaComponent } from './Components/encuesta/encuesta.component';
import { VerReseniaComponent } from './Components/ver-resenia/ver-resenia.component';
import { AtenderTurnoComponent } from './Components/atender-turno/atender-turno.component';
import { CommonModule } from '@angular/common';
import{RegistrarUsuarioComponent} from './Components/registrar-usuario/registrar-usuario.component'

const routes: Routes = [
  { path: '', redirectTo: 'Principal', pathMatch: 'full' },
  { path: 'Principal', component: PrincipalComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Cliente','Recepcionista','Especialista']},
    children: [
      {
        path: 'Registro',
        component: RegistrarUsuarioComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Administrador'] }
      },
      {
        path: 'PedirTurno',
        component: PedirTurnoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Recepcionista','Cliente'] }
      },
      {
        path: 'AtenderTurno',
        component: AtenderTurnoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Especialista'] }
      },
      {
        path: 'VerResenia',
        component: VerReseniaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Cliente'] }
      },
      {
        path: 'Resenia',
        component: ReseniaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Especialista'] }
      },
      {
        path: 'Encuesta',
        component: EncuestaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Cliente'] }
      }
    ]
  },
  {path: 'Login', component: LoginComponent}
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
