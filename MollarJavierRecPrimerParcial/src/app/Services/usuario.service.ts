import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Usuario } from '../Entities/usuario';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http:HttpBaseService<Usuario>) { }
  

  public Listar(): Observable<Usuario[]> {
    return this.http.httpGetO('Usuarios/listar');
  }

  public Agregar(object : JSON){
    return this.http.httpPostP('Usuarios/registrar',object);
  }

  public Borrar(id: number) : Promise<any> {
    return this.http.httpDeleteP('Usuarios/' + id);
  }

  public FiltrarPorUsuario(nombre : string){
    return this.Listar().pipe<Usuario[]>(
      map( usuarios => {
        if(nombre === undefined || nombre === ''){
          return usuarios;
        }
        else{
          return (usuarios as Usuario[]).filter( objeto => objeto.nombre.toLowerCase() === nombre.toLowerCase());
        }
      })
    ).toPromise();
  }
}
