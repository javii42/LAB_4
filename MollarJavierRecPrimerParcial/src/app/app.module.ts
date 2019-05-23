import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataService} from './Services/data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './Components/lista/lista.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { BotonComponent } from './Components/boton/boton.component';
import { AltaComponent } from './Components/alta/alta.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BuscarModeloComponent } from './Components/buscar-modelo/buscar-modelo.component';
import { ColorDirective } from './Directives/color.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AltaActorComponent } from './Components/alta-actor/alta-actor.component';
import { ListaActorComponent } from './Components/lista-actor/lista-actor.component';
import { BusquedaComponent } from './Components/busqueda/busqueda.component';
import { BotonClienteComponent } from './Components/boton-cliente/boton-cliente.component';
import { ListaRelacionComponent } from './Components/lista-relacion/lista-relacion.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    PrincipalComponent,
    BotonComponent,
    AltaComponent,
    NavBarComponent,
    BuscarModeloComponent,
    ColorDirective,
    AltaActorComponent,
    ListaActorComponent,
    BusquedaComponent,
    BotonClienteComponent,
    ListaRelacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
