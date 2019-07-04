import { LoginUsuarioComponent } from './../Componentes/Usuario/login-usuario/login-usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Common/auth.guard';

import { RegistroUsuarioComponent } from '../Componentes/Usuario/registro-usuario/registro-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {
    path: 'Login', component: LoginUsuarioComponent
  },
   {
    path: 'Registro', component: RegistroUsuarioComponent
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
