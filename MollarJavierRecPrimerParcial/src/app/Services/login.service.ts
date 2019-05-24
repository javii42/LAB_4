import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Usuario } from '../Entities/usuario';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpBaseService<Usuario>) { }

  public CrearToken(object : JSON){
    return this.http.httpPostP('crearToken/',object);
  }
  public Verificar(object){
    return this.http.httpPostP('verificarToken/',object);
  }
}
