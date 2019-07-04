import { Injectable } from '@angular/core';
import { HttpBase } from './http-base.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(public miHttp: HttpBase, public router: Router) {
  }

  loguear(mail: string, clave: string, tipo: string) {
    const request: Object = {
      mail: mail,
      clave: clave,
      tipo: tipo
    };
    console.log(request);
    return this.miHttp.httpPostP('/login', request).then( response => {
      console.log("entro");
      if (response['Estado'] == 'OK') {
        localStorage.setItem('token', response['Token']);
        if (!this.redirectUrl) {
          this.redirectUrl = '/';
        }
        this.router.navigate([this.redirectUrl]);
      }else{
        console.log(response['Estado']);
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
