import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Relacion } from '../Entities/relacion';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelacionService {

  constructor(public http:HttpBaseService<Relacion>) { }
  

  public Listar(): Observable<Relacion[]> {
    return this.http.httpGetO('Relacion/listar');
  }

  public Agregar(object : JSON){
    return this.http.httpPostP('Relacion/registrar',object);
  }

  public BorrarIDPelicula(id: number) : Promise<any> {
    return this.http.httpDeleteP('Relacion/bajaPelicula/' + id);
  }
  public BorrarIDActor(id: number) : Promise<any> {
    return this.http.httpDeleteP('Relacion/bajaActor/' + id);
  }

  public FiltrarPorActor(nombre : string){
    return this.Listar().pipe<Relacion[]>(
      map( relaciones => {
        if(nombre === undefined || nombre === ''){
          return relaciones;
        }
        else{
          return (relaciones as Relacion[]).filter( objeto => objeto.nombre.toLowerCase() === nombre.toLowerCase());
        }
      })
    ).toPromise();
  }
}