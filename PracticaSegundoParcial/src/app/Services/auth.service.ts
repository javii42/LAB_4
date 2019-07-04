import { Injectable,EventEmitter, Input, Output } from '@angular/core';
import { HttpBase } from './http-base.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() email = new EventEmitter<String>();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public miHttp: HttpBase, public router: Router) {
  }

  loguear(mail: string, nombre: string, clave: string, perfil: string) {
    const request: Object = {
      mail: mail,
      nombre: nombre,
      clave: clave,
      perfil: perfil
    };
    return this.miHttp.httpPostP('/login', request).then( response => {
      if (response['Estado'] === 'OK') {
        localStorage.setItem('token', response['Token']);
        if (!this.redirectUrl) {
          this.redirectUrl = '/';
          console.log("OK");
          this.email.emit(mail);
        }
        this.router.navigate([this.redirectUrl]);
      }

      return response;
    }).catch(error =>{
      console.log(error);
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
}
