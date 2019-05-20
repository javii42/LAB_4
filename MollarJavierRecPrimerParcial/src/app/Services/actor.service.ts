import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Actor } from '../Entities/actor';
import { Observable } from 'rxjs';
import { map, tap, catchError, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(public http:HttpBaseService<Actor>) { }
  

  public Listar(): Observable<Actor[]> {
    return this.http.httpGetO('Actores/listar');
  }

  public Agregar(object : JSON){
    console.log(object);
    return this.http.httpPostP('Actores/registrar',object);
  }

  public Borrar(id: number) : Promise<any> {
    return this.http.httpDeleteP('Actores/' + id);
  }

  public FiltrarPorActor(nombre : string){
    return this.Listar().pipe<Actor[]>(
      map( actores => {
        if(nombre === undefined || nombre === ''){
          return actores;
        }
        else{
          return (actores as Actor[]).filter( objeto => objeto.nombre.toLowerCase() === nombre.toLowerCase());
        }
      })
    ).toPromise();
  }
}
