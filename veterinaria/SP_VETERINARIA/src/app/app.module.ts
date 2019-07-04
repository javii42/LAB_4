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
import { ReactiveFormsModule } from '@angular/forms';
import { PanelDirective } from './Directives/panel.directive';
import { NavegacionComponent } from './Componentes/Usuario/navegacion/navegacion.component';
import { ValidarRolesDirective } from './Directives/validar-roles.directive';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DolarPipe } from './Pipes/dolar.pipe';
import { EspacioPipe } from './Pipes/espacio.pipe';
import { SexoDirective } from './Directives/sexo.directive';
import { AumentoPipe } from './aumento.pipe';


import { AuthService } from './Services/auth.service';

import { UsuarioService } from './Services/usuario.service';
import { MascotaService } from './Services/mascota.service';

import { RegistroUsuarioComponent } from './Componentes/Usuario/registro-usuario/registro-usuario.component';
import { LoginUsuarioComponent } from './Componentes/Usuario/login-usuario/login-usuario.component';

export function getAccessToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PanelDirective,
    NavegacionComponent,
    ValidarRolesDirective,
    DolarPipe,
    EspacioPipe,
    SexoDirective,
    AumentoPipe,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
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
        whitelistedDomains: ['https://mauriciocerizza.github.io', 'localhost:4200']
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
    AuthService,
    MascotaService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
