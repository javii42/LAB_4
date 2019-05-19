import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{PrincipalComponent} from './Components/principal/principal.component';
import{ListaComponent} from './Components/lista/lista.component';
import{AltaComponent} from './Components/alta/alta.component';

const routes: Routes = [
  {path: 'Lista', component: ListaComponent, data: {animation: 'Lista'} },
  {path: 'Agregar', component: AltaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
