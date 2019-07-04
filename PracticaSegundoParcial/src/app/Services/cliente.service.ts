import { Observable } from 'rxjs';
import { User } from './../Model/User';
import { HttpBase } from './http-base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<User[]> {
    return this.miHttp.httpGetO<User[]>('/');
  }

  public ListarPorID(id: number): Observable<User> {
    return this.miHttp.httpGetO<User>('/User/' + id);
  }

  public Registrar(mail: string, clave: string, nombre: string, perfil: string, sexo: string): Promise<Object> {
    const request: Object = {
      mail: mail,
      clave: clave,
      nombre: nombre,
      perfil: perfil,
      sexo: sexo
    };
    return this.miHttp.httpPostP('/', request);
  }

  public ActualizarPromocion(id: number, estado: number): Promise<Object> {
    const request: Object = {
      id: id,
      estado: estado
    };
    return this.miHttp.httpPutP('/', request);
  }
}
