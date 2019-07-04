import { Observable } from 'rxjs';
import { User } from './../Model/User';
import { HttpBase } from './http-base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(public miHttp: HttpBase) {}

	
  public Registrar(mail: string, nombre: string, perfil: string, sexo: string, clave: string): Promise<Object> {
    const request: Object = {
      mail: mail,
      nombre: nombre,
      perfil: perfil,
      sexo: sexo,
      clave: clave
    };
    return this.miHttp.httpPostP('/', request);
  }	


}
