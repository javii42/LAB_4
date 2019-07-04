import { Observable } from 'rxjs';
import { Usuario } from './../Model/Usuario';
import { HttpBase } from './http-base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public miHttp: HttpBase) {
  }

  public Listar(): Observable<Usuario[]> {
    return this.miHttp.httpGetO<Usuario[]>('/');
  }

  public ListarPorID(id: number): Observable<Usuario> {
    return this.miHttp.httpGetO<Usuario>('/Usuario/' + id);
  }

  public Registrar(mail: string, clave: string, tipo: string): Promise<Object> {
    const request: Object = {
      mail: mail,
      clave: clave,
      tipo: tipo
    };
    return this.miHttp.httpPostP('/', request);
  }

  /*public ActualizarPromocion(id: number, estado: number): Promise<Object> {
    const request: Object = {
      id: id,
      estado: estado
    };
    return this.miHttp.httpPutP('/', request);
  }*/
}
