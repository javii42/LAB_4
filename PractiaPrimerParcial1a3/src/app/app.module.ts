import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './Components/lista/lista.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { BotonComponent } from './Components/boton/boton.component';
import { AltaComponent } from './Components/alta/alta.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BuscarModeloComponent } from './Components/buscar-modelo/buscar-modelo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    PrincipalComponent,
    BotonComponent,
    AltaComponent,
    NavBarComponent,
    BuscarModeloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
