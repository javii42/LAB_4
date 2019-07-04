import { ClienteService } from './Services/cliente.service';
import { ZapatoService } from './Services/zapato.service';
import { RelacionService } from './Services/relacion.service';
import { Registro2Component } from './Components/principal/clientes/registro/registro.component';
import { AppRoutingModule } from './Routes/app-routing.module';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpBase } from './Services/http-base.service';
import { SpinnerInterceptor } from './Services/Interceptors/SpinnerInterceptor';
import { ErrorInterceptor } from './Services/Interceptors/ErrorInterceptor';
import { JwtInterceptor } from './Services/Interceptors/JWTInterceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelDirective } from './Directives/panel.directive';
import { NavegacionComponent } from './Components/navegacion/navegacion.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { ValidarRolesDirective } from './Directives/validar-roles.directive';
import { ClientesComponent } from './Components/principal/clientes/clientes.component';
import { ServiciosComponent } from './Components/principal/servicios/servicios.component';
import { RegistroComponent } from './Components/principal/servicios/registro/registro.component';
import { ListaComponent } from './Components/principal/servicios/lista/lista.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Lista2Component } from './Components/principal/clientes/lista/lista.component';
import { DolarPipe } from './Pipes/dolar.pipe';
import { EspacioPipe } from './Pipes/espacio.pipe';
import { SexoDirective } from './Directives/sexo.directive';
import { EstadisticasComponent } from './Components/principal/estadisticas/estadisticas.component';
import { AumentoPipe } from './aumento.pipe';
import { CardComponent } from './Components/principal/clientes/lista/card/card.component';
import {RegistroUsuarioComponent} from './Components/login/registro/registro.component';
import { RelacionComponent } from './Components/principal/relacion/relacion.component';


export function getAccessToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelDirective,
    NavegacionComponent,
    PrincipalComponent,
    ValidarRolesDirective,
    ClientesComponent,
    ServiciosComponent,
    RegistroComponent,
    ListaComponent,
    Registro2Component,
    Lista2Component,
    DolarPipe,
    EspacioPipe,
    SexoDirective,
    EstadisticasComponent,
    AumentoPipe,
    CardComponent,
    RegistroUsuarioComponent,
    RelacionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxCaptchaModule,
    [JwtModule.forRoot({
      config: {
        tokenGetter: (getAccessToken),
        whitelistedDomains: ['localhost:4200']
      }
    })]
  ],
  providers: [
    HttpBase,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    JwtHelperService,
    NgxSpinnerService,
    ZapatoService,
    ClienteService,
    RelacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
