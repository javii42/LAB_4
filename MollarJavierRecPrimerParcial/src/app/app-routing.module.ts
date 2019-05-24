import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{PrincipalComponent} from './Components/principal/principal.component';
import{ListaComponent} from './Components/lista/lista.component';
import{AltaComponent} from './Components/alta/alta.component';
import{AltaActorComponent} from './Components/alta-actor/alta-actor.component';
import{ListaActorComponent} from './Components/lista-actor/lista-actor.component';
import {BusquedaComponent} from './Components/busqueda/busqueda.component';
import{ListaRelacionComponent} from './Components/lista-relacion/lista-relacion.component';
import{UsuarioComponent} from './Components/usuario/usuario.component';
import{LoginComponent} from './Components/login/login.component';

const routes: Routes = [
  	{path: 'peliculas', component: ListaComponent, data: {animation: 'Lista'}},
	{path: 'peliculas/alta', component: AltaComponent},
  	{path: 'actor/alta', component: AltaActorComponent, data: {animation: 'Lista'}},
  	{path: 'actor/listado', component: ListaActorComponent, data: {animation: 'Lista'}},
  	{path: 'busqueda', component: BusquedaComponent},
  	{path: 'listadoRelacion', component:ListaRelacionComponent},
  	{path: 'registrar', component:UsuarioComponent},
  	{path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
