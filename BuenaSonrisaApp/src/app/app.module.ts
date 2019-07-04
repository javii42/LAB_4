import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

import { SpinnerInterceptor } from './Services/Interceptors/SpinnerInterceptor';
import { ErrorInterceptor } from './Services/Interceptors/ErrorInterceptor';
import { AuthService } from './Services/auth.service';

import { ValidarRolesDirective } from './Directives/validar-roles.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpBase } from './Services/http-base.service';
import { PrincipalComponent } from './Components/principal/principal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { NavegacionComponent } from './Components/navegacion/navegacion.component';
import { RegistrarUsuarioComponent } from './Components/registrar-usuario/registrar-usuario.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { PedirTurnoComponent } from './Components/pedir-turno/pedir-turno.component';
import { AtenderTurnoComponent } from './Components/atender-turno/atender-turno.component';
import { ReseniaComponent } from './Components/resenia/resenia.component';
import { VerReseniaComponent } from './Components/ver-resenia/ver-resenia.component';
import { EncuestaComponent } from './Components/encuesta/encuesta.component';


export function getAccessToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    ValidarRolesDirective,
    NavegacionComponent,
    RegistrarUsuarioComponent,
    PedirTurnoComponent,
    AtenderTurnoComponent,
    ReseniaComponent,
    VerReseniaComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AngularFirestore,
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
    NgxSpinnerService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
